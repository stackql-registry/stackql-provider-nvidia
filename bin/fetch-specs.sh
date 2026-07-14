#!/usr/bin/env bash
#
# Acquire both upstream spec sources into provider-dev/downloaded/:
#   1. NVCF  - published OpenAPI spec served by the NVCF API itself
#              (provider-dev/scripts/fetch_nvcf_spec.mjs)
#   2. NGC   - per-service definitions harvested from the API explorer at
#              docs.ngc.nvidia.com/api/ (provider-dev/scripts/harvest_ngc_spec.mjs)
# then record/verify pins (URL, date, sha256) in provider-dev/config/spec_pin.json.
#
# Re-runnable. Pass --check to verify current downloads against the recorded
# pins without writing anything (CI drift job).

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

CHECK_MODE=""
if [ "${1:-}" = "--check" ]; then
  CHECK_MODE="--check"
fi

node "$REPO_ROOT/provider-dev/scripts/fetch_nvcf_spec.mjs"
node "$REPO_ROOT/provider-dev/scripts/harvest_ngc_spec.mjs"
node "$REPO_ROOT/provider-dev/scripts/pin_specs.mjs" $CHECK_MODE

echo "Done. Downloaded specs in $REPO_ROOT/provider-dev/downloaded"
