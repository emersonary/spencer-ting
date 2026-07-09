#!/usr/bin/env bash
# Ensure spencerting.solidia.app points at this server (GoDaddy API optional).
set -euo pipefail

DOMAIN="spencerting.solidia.app"
TARGET_IP="${1:-$(curl -fsS https://checkip.amazonaws.com | tr -d '[:space:]')}"

if getent ahosts "$DOMAIN" | awk '{print $1}' | grep -qx "$TARGET_IP"; then
  echo "DNS OK: ${DOMAIN} -> ${TARGET_IP}"
  exit 0
fi

if [[ -n "${GODADDY_API_KEY:-}" && -n "${GODADDY_API_SECRET:-}" ]]; then
  echo "Creating GoDaddy A record ${DOMAIN} -> ${TARGET_IP}"
  curl -fsS -X PUT \
    -H "Authorization: sso-key ${GODADDY_API_KEY}:${GODADDY_API_SECRET}" \
    -H "Content-Type: application/json" \
    "https://api.godaddy.com/v1/domains/solidia.app/records/A/spencerting" \
    -d "[{\"data\":\"${TARGET_IP}\",\"ttl\":600}]"
  sleep 15
  if getent ahosts "$DOMAIN" | awk '{print $1}' | grep -qx "$TARGET_IP"; then
    echo "DNS updated."
    exit 0
  fi
fi

echo "WARNING: ${DOMAIN} does not resolve to ${TARGET_IP} yet."
echo "Add an A record: ${DOMAIN} -> ${TARGET_IP}"
exit 0
