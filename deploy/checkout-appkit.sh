#!/usr/bin/env bash
# Clone github.com/emersonary/appkit next to spencer-ting so replace paths resolve.
set -euo pipefail

REF="${APPKIT_REF:-main}"
REPO="${APPKIT_REPO:-https://github.com/emersonary/appkit.git}"

if [[ -z "${GITHUB_WORKSPACE:-}" ]]; then
  ROOT="$(cd "$(dirname "$0")/.." && pwd)"
else
  ROOT="$GITHUB_WORKSPACE"
fi

DEST="$(dirname "$ROOT")/via-jeri/appkit"

mkdir -p "$(dirname "$DEST")"

if [[ -n "${GITHUB_TOKEN:-}" ]]; then
  git config --global url."https://x-access-token:${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
fi

rm -rf "$DEST"
git clone --depth 1 --branch "$REF" "$REPO" "$DEST"

test -f "$DEST/blocks/account/web/package.json"
test -f "$DEST/go/go.mod"
test -f "$DEST/blocks/account/go/go.mod"

echo "==> Installing appkit-accounts npm dependencies..."
npm install --prefix "$DEST/blocks/account/web" --no-audit --no-fund

echo "Appkit ready at $DEST (ref $REF)"
