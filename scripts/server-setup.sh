#!/usr/bin/env bash
# One-time setup for a fresh Ubuntu VPS:
#   1. Docker Engine + Compose plugin (official Docker apt repository)
#   2. Swap file, so `next build` does not run out of memory on small plans
#   3. ufw firewall allowing SSH, HTTP and HTTPS
#
# Run on the VPS:  sudo bash scripts/server-setup.sh
set -euo pipefail

if [[ ${EUID} -ne 0 ]]; then
  echo "Please run as root: sudo bash scripts/server-setup.sh" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

echo "==> Installing base packages"
apt-get update
apt-get install -y ca-certificates curl git ufw

echo "==> Installing Docker Engine"
if ! command -v docker >/dev/null 2>&1; then
  # Remove distro packages that conflict with Docker's official ones.
  for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do
    apt-get remove -y "$pkg" >/dev/null 2>&1 || true
  done

  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc

  # shellcheck disable=SC1091
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${UBUNTU_CODENAME:-$VERSION_CODENAME} stable" \
    > /etc/apt/sources.list.d/docker.list

  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
else
  echo "Docker already installed: $(docker --version)"
fi
systemctl enable --now docker

# Let the user who ran sudo use docker without sudo (takes effect on next login).
if [[ -n "${SUDO_USER:-}" && "${SUDO_USER}" != "root" ]]; then
  usermod -aG docker "${SUDO_USER}"
  echo "Added ${SUDO_USER} to the docker group. Log out and back in to use docker without sudo."
fi

echo "==> Ensuring swap"
if [[ -z "$(swapon --show --noheadings)" ]]; then
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "Created a 2G swap file."
else
  echo "Swap already present."
fi

echo "==> Configuring firewall (ufw)"
# Allow every port sshd is configured on, plus the port of the current SSH
# session, so enabling the firewall can never lock you out.
ssh_ports="22"
if command -v sshd >/dev/null 2>&1; then
  ssh_ports="${ssh_ports} $(sshd -T 2>/dev/null | awk '$1 == "port" {print $2}' | tr '\n' ' ')"
fi
if [[ -n "${SSH_CONNECTION:-}" ]]; then
  ssh_ports="${ssh_ports} $(awk '{print $4}' <<<"${SSH_CONNECTION}")"
fi
for port in $(tr ' ' '\n' <<<"${ssh_ports}" | grep -E '^[0-9]+$' | sort -un); do
  ufw allow "${port}/tcp" comment 'SSH'
done
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable
ufw status verbose

echo
echo "Setup complete."
docker --version
docker compose version
