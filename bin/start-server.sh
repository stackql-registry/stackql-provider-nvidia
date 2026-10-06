#!/bin/bash

# Start a stackql wire server (pgwire) against the local file registry for
# the meta-route suite. Binary resolution: $STACKQL, ./stackql, then
# `stackql` on PATH (the test runners resolve the same way); download into
# the repo only as a last resort.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR="$( cd "$DIR/.." && pwd )"

PROVIDER=""
REG_PATH=""
PORT="5444"
VERIFY="false"

function display_help() {
  echo "Usage: start-server.sh [OPTIONS]"
  echo "Options:"
  echo "  --provider NAME    Provider name (default: use provider from package.json)"
  echo "  --registry PATH    Path to local registry root (default: provider-dev/openapi)"
  echo "  --port PORT        Port to run server on (default: 5444)"
  echo "  --verify           Enable signature verification (default: false)"
  echo "  --help             Display this help message"
}

while [[ $# -gt 0 ]]; do
  case $1 in
    --provider) PROVIDER="$2"; shift 2 ;;
    --registry) REG_PATH="$2"; shift 2 ;;
    --port) PORT="$2"; shift 2 ;;
    --verify) VERIFY="true"; shift ;;
    --help) display_help; exit 0 ;;
    *) echo "Unknown option: $1"; display_help; exit 1 ;;
  esac
done

if [ -z "$PROVIDER" ] && [ -f "$BASE_DIR/package.json" ]; then
  PROVIDER=$(grep -o '"name": "stackql-provider-[^"]*"' "$BASE_DIR/package.json" | sed 's/"name": "stackql-provider-//' | sed 's/"//')
fi
if [ -z "$REG_PATH" ]; then
  REG_PATH="$BASE_DIR/provider-dev/openapi"
fi

echo "Using provider: $PROVIDER"
echo "Registry path: $REG_PATH"
echo "Port: $PORT"
echo "Verify signatures: $VERIFY"

STACKQL_BIN=""
if [ -n "${STACKQL:-}" ] && [ -x "$STACKQL" ]; then
  STACKQL_BIN="$STACKQL"
elif [ -x "$BASE_DIR/stackql" ]; then
  STACKQL_BIN="$BASE_DIR/stackql"
elif command -v stackql >/dev/null 2>&1; then
  STACKQL_BIN="$(command -v stackql)"
fi

if [ -z "$STACKQL_BIN" ]; then
  echo "StackQL binary not found. Downloading..."
  OS=$(uname -s | tr '[:upper:]' '[:lower:]')
  ARCH=$(uname -m)
  if [ "$ARCH" = "x86_64" ]; then ARCH="amd64"; elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then ARCH="arm64"; fi
  if [ "$OS" = "darwin" ]; then
    DOWNLOAD_URL="https://releases.stackql.io/stackql/latest/stackql_darwin_${ARCH}.zip"
  elif [ "$OS" = "linux" ]; then
    DOWNLOAD_URL="https://releases.stackql.io/stackql/latest/stackql_linux_${ARCH}.zip"
  else
    echo "Unsupported OS: $OS - download stackql manually from https://github.com/stackql/stackql/releases"
    exit 1
  fi
  cd "$BASE_DIR"
  curl -L -o stackql.zip "$DOWNLOAD_URL"
  unzip -o stackql.zip
  rm stackql.zip
  chmod +x stackql
  STACKQL_BIN="$BASE_DIR/stackql"
  echo "StackQL binary downloaded successfully"
fi

if [ "$VERIFY" = "true" ]; then
  REG='{"url": "file://'${REG_PATH}'", "localDocRoot": "'${REG_PATH}'", "verifyConfig": {"nopVerify": false}}'
else
  REG='{"url": "file://'${REG_PATH}'", "localDocRoot": "'${REG_PATH}'", "verifyConfig": {"nopVerify": true}}'
fi

if pgrep -f "stackql.*--pgsrv.port=${PORT}" > /dev/null; then
  echo "StackQL server is already running on port ${PORT}"
  exit 0
fi

echo "Starting StackQL server ($STACKQL_BIN) with registry: $REG"
cd "$BASE_DIR"
nohup "$STACKQL_BIN" --registry="${REG}" --pgsrv.port="${PORT}" srv > stackql-server.log 2>&1 &
SERVER_PID=$!

sleep 2
if ps -p $SERVER_PID > /dev/null; then
  echo "StackQL server started successfully with PID: $SERVER_PID"
  echo "Server log: $BASE_DIR/stackql-server.log"
else
  echo "Failed to start StackQL server. Check log file: $BASE_DIR/stackql-server.log"
  exit 1
fi
