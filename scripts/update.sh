#!/usr/bin/env bash
# Update the live site after you push changes to GitHub.
#
# Run on the VPS from the repo folder:
#   cd ~/afrinex && bash scripts/update.sh
#
# What it does:
#   1. Pulls the latest code from GitHub.
#   2. Checks whether dependencies changed in package.json or package-lock.json.
#   3. Rebuilds the site image. Docker reinstalls packages only when the
#      dependency files changed. Otherwise it reuses the cached install.
#   4. Restarts the site container with the new build and waits until healthy.
#   5. Tests the nginx config and reloads nginx.
#   6. Checks that the site responds and warns when the certificate expires soon.
#
# If the build fails, the script stops and the current site keeps running.
set -euo pipefail

cd "$(dirname "$0")/.."

DOMAIN="afrinexsolutions.co.ke"
CERT="nginx/certs/origin.pem"
KEY="nginx/certs/origin.key"

step() { printf '\n==> %s\n' "$*"; }
fail() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }
trap 'printf "\nUpdate stopped. See the error above. Logs: docker compose logs --tail 50 web nginx\n" >&2' ERR

for file in "$CERT" "$KEY"; do
  [[ -s "$file" ]] || fail "Missing $file. Follow 'Copy the certificate to nginx' in DEPLOYMENT.md."
done

# 1. Pull ---------------------------------------------------------------------
step "Pulling latest code"
old_rev="$(git rev-parse HEAD)"
git pull --ff-only
new_rev="$(git rev-parse HEAD)"

if [[ "$old_rev" == "$new_rev" ]]; then
  echo "No new commits. Rebuilding the current version."
else
  echo "New commits:"
  git --no-pager log --oneline "$old_rev..$new_rev"
fi

# 2. Dependencies -------------------------------------------------------------
step "Checking dependencies"
changed_files="$(git diff --name-only "$old_rev" "$new_rev" -- package.json package-lock.json)"

if [[ -z "$changed_files" ]]; then
  echo "No dependency changes. The build reuses the installed packages."
else
  echo "Dependency files changed:"
  sed 's/^/  /' <<<"$changed_files"

  echo "Lines added (+) or removed (-) in package.json:"
  git --no-pager diff -U0 "$old_rev" "$new_rev" -- package.json \
    | grep -E '^[+-][[:space:]]+"[^"]+":[[:space:]]*"' || echo "  none"

  if ! grep -qx "package-lock.json" <<<"$changed_files"; then
    echo "WARNING: package.json changed but package-lock.json did not." >&2
    echo "If you added or removed a package, run 'npm install' on your PC," >&2
    echo "commit package-lock.json and push again, or the build will fail." >&2
  fi
  echo "Docker installs the new dependencies during the build."
fi

# 3. Build --------------------------------------------------------------------
step "Building the site image"
docker compose build web

# 4. Restart ------------------------------------------------------------------
step "Restarting containers with the new build"
docker compose up -d --remove-orphans --wait --wait-timeout 180

# 5. nginx --------------------------------------------------------------------
step "Testing and reloading nginx"
docker compose exec -T nginx nginx -t
docker compose exec -T nginx nginx -s reload

step "Removing old images"
docker image prune -f >/dev/null
echo "Done."

# 6. Check --------------------------------------------------------------------
step "Checking the site"
docker compose ps

status="$(curl -sk -o /dev/null -w '%{http_code}' --max-time 15 \
  --resolve "$DOMAIN:443:127.0.0.1" "https://$DOMAIN/" || true)"
if [[ "$status" == "200" ]]; then
  echo "https://$DOMAIN/ responded with 200."
else
  fail "https://$DOMAIN/ responded with '$status'. Check: docker compose logs --tail 50 web nginx"
fi

expiry="$(openssl x509 -noout -enddate -in "$CERT" | cut -d= -f2)"
if openssl x509 -noout -checkend $((30 * 24 * 3600)) -in "$CERT" >/dev/null; then
  echo "Certificate valid until $expiry."
else
  echo "WARNING: certificate expires on $expiry. Follow 'Renewing the certificate' in DEPLOYMENT.md." >&2
fi

printf '\nUpdate complete. Commit %s is live at https://%s\n' "$(git rev-parse --short HEAD)" "$DOMAIN"
