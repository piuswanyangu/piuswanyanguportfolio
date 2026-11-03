#!/usr/bin/env bash
# Pull the latest code, rebuild the site image and restart the stack.
# Run on the VPS from the repo root:  bash scripts/deploy.sh
set -euo pipefail

cd "$(dirname "$0")/.."

for file in nginx/certs/origin.pem nginx/certs/origin.key; do
  if [[ ! -s "${file}" ]]; then
    echo "Missing ${file}. Create the Cloudflare Origin Certificate first (DEPLOYMENT.md, step 4)." >&2
    exit 1
  fi
done

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Building the site image"
docker compose build --pull web

echo "==> Starting containers"
docker compose up -d --remove-orphans --wait

echo "==> Reloading nginx config"
docker compose exec -T nginx nginx -t
docker compose exec -T nginx nginx -s reload

echo "==> Cleaning up old images"
docker image prune -f >/dev/null

docker compose ps
echo
echo "Deployed. Check https://afrinexsolutions.co.ke"
