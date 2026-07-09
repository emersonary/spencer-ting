#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 || $# -gt 4 ]]; then
  echo "usage: $0 <service-name> <port> [health-path] [probe-path]" >&2
  exit 2
fi

SERVICE_NAME="$1"
PORT="$2"
HEALTH_PATH="${3:-/healthz}"
PROBE_PATH="${4:-}"
ATTEMPTS="${ATTEMPTS:-5}"
SLEEP_SECONDS="${SLEEP_SECONDS:-2}"
BASE_URL="http://127.0.0.1:${PORT}"

for ((i = 1; i <= ATTEMPTS; i++)); do
  if curl -fsS "${BASE_URL}${HEALTH_PATH}" >/dev/null; then
    if [[ -n "$PROBE_PATH" ]]; then
      curl -i "${BASE_URL}${PROBE_PATH}" || true
    fi
    exit 0
  fi
  sleep "$SLEEP_SECONDS"
done

sudo systemctl status "$SERVICE_NAME" --no-pager || true
sudo journalctl -u "$SERVICE_NAME" -n 80 --no-pager || true
exit 1
