#!/usr/bin/env bash
# Build the site and publish it to /srv/abram.tech on hadal (served by Caddy on 127.0.0.1:8080,
# exposed publicly only through Cloudflare Tunnel). Run on hadal: bash deploy.sh
# Requires Node >= 22.17 (SvelteKit 3).
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
TARGET="${TARGET:-/srv/abram.tech}"

command -v rsync >/dev/null || sudo apt-get install -y rsync

cd "$HERE"
npm ci
npm run check
npm run build

sudo mkdir -p "$TARGET"
sudo rsync -a --delete build/ "$TARGET/"
sudo chown -R root:caddy "$TARGET"
sudo chmod -R u=rwX,g=rX,o=rX "$TARGET"

echo "Deployed to $TARGET"
curl -fsS -o /dev/null -w "Local check: HTTP %{http_code}\n" http://127.0.0.1:8080/ \
  || echo "Caddy :8080 not answering yet (is the website block in /etc/caddy/Caddyfile applied?)"
