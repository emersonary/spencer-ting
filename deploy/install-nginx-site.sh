#!/usr/bin/env bash
set -euo pipefail

SITE_SOURCE="${1:-/tmp/spencer-ting-deploy/nginx-spencer-ting.conf}"
SNIPPET_SOURCE="${2:-/tmp/spencer-ting-deploy/nginx-api-proxy.conf}"
SITE_NAME="spencer-ting"

if ! grep -q "spencerting.solidia.app" "$SITE_SOURCE"; then
  echo "refusing to install: $SITE_SOURCE does not look like spencer-ting nginx config" >&2
  exit 1
fi

sudo cp "$SNIPPET_SOURCE" /etc/nginx/snippets/spencer-ting-api-proxy.conf
sudo cp "$SITE_SOURCE" "/etc/nginx/sites-available/${SITE_NAME}"
sudo ln -sf "/etc/nginx/sites-available/${SITE_NAME}" "/etc/nginx/sites-enabled/${SITE_NAME}"
sudo nginx -t
sudo systemctl reload nginx

echo "Nginx site ${SITE_NAME} installed for spencerting.solidia.app"
