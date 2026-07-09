#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 3 || $# -gt 4 ]]; then
  echo "usage: $0 <service-name> <binary-path> <unit-source> [env-file]" >&2
  exit 2
fi

SERVICE_NAME="$1"
BINARY_PATH="$2"
UNIT_SOURCE="$3"
ENV_FILE="${4:-/etc/${SERVICE_NAME}.env}"
UNIT_TARGET="/etc/systemd/system/${SERVICE_NAME}.service"

if [[ -n "${SERVICE_ENV_B64:-}" ]]; then
  printf '%s' "$SERVICE_ENV_B64" | base64 -d | sudo tee "$ENV_FILE" >/dev/null
  sudo chmod 600 "$ENV_FILE"
fi

sudo chmod +x "$BINARY_PATH"
sudo mv "$UNIT_SOURCE" "$UNIT_TARGET"
sudo systemctl daemon-reload
sudo systemctl enable --now "$SERVICE_NAME"
sudo systemctl restart "$SERVICE_NAME"
