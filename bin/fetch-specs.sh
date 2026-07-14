#!/usr/bin/env bash
#
# Acquire both upstream spec sources into provider-dev/downloaded/:
#   1. NVCF  - published OpenAPI spec served by the NVCF API itself
#   2. NGC   - per-service definitions harvested from the API explorer at
#              docs.ngc.nvidia.com/api/ (harvest_ngc_spec.mjs)
# then record/verify pins (URL, date, sha256) in provider-dev/config/spec_pin.json.
#
# Re-runnable. Pass --check to verify current downloads against the recorded
# pins without writing anything (CI drift job).

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
DOWNLOAD_DIR="$REPO_ROOT/provider-dev/downloaded"

NVCF_SPEC_URL="https://api.nvcf.nvidia.com/v3/openapi"

CHECK_MODE=""
if [ "${1:-}" = "--check" ]; then
  CHECK_MODE="--check"
fi

mkdir -p "$DOWNLOAD_DIR"

echo "Fetching NVCF OpenAPI spec: $NVCF_SPEC_URL"
TMP_FILE="$(mktemp)"
curl -sSf "$NVCF_SPEC_URL" -o "$TMP_FILE"
# fail without writing if the payload is not parseable JSON with an openapi field
node -e "const s=JSON.parse(require('fs').readFileSync('$TMP_FILE','utf8')); if(!s.openapi||!s.paths){console.error('NVCF payload is not an OpenAPI document');process.exit(1);} console.log('NVCF spec ok: openapi='+s.openapi+' version='+(s.info&&s.info.version)+' paths='+Object.keys(s.paths).length);"
mv "$TMP_FILE" "$DOWNLOAD_DIR/nvcf_openapi.json"

echo "Harvesting NGC definitions from docs.ngc.nvidia.com/api/"
node "$REPO_ROOT/provider-dev/scripts/harvest_ngc_spec.mjs"

echo "Recording/verifying pins"
node "$REPO_ROOT/provider-dev/scripts/pin_specs.mjs" $CHECK_MODE

echo "Done. Downloaded specs in $DOWNLOAD_DIR"
