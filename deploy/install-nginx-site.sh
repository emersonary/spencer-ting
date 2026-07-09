#!/usr/bin/env bash
set -euo pipefail

SITE_SOURCE="${1:-/tmp/nginx-spencer-ting.conf}"
SNIPPET_SOURCE="${2:-/tmp/nginx-api-proxy.conf}"
SITE_NAME="spencer-ting"

sudo cp "$SNIPPET_SOURCE" /etc/nginx/snippets/spencer-ting-api-proxy.conf
sudo cp "$SITE_SOURCE" "/etc/nginx/sites-available/${SITE_NAME}"
sudo ln -sf "/etc/nginx/sites-available/${SITE_NAME}" "/etc/nginx/sites-enabled/${SITE_NAME}"
sudo nginx -t
sudo systemctl reload nginx

echo "Nginx site ${SITE_NAME} installed for spencerting.solidia.app"
