#!/usr/bin/env bash
#
# Acquire every upstream input into provider-dev/downloaded/:
#   1. NVCF  - published OpenAPI spec served by the NVCF API itself
#              (provider-dev/scripts/fetch_nvcf_spec.mjs)
#   2. NGC   - per-service definitions harvested from the API explorer at
#              docs.ngc.nvidia.com/api/ (provider-dev/scripts/harvest_ngc_spec.mjs)
#   3. ngcsdk - response schemas derived from the pinned ngcsdk PyPI wheel
#              (provider-dev/scripts/harvest_ngc_sdk_schemas.mjs; the wheel
#              is pinned by version + sha256 inside the script)
# then record (default) or verify (--check) the pins in
# provider-dev/config/spec_pin.json.
#
# Re-runnable. With --check the downloads are refreshed and verified against
# the recorded pins WITHOUT rewriting them: any drift fails the run, and
# `git checkout -- provider-dev/downloaded` restores the pinned inputs
# (or `npm run fetch-specs` accepts the change by re-pinning).

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

CHECK_MODE=""
if [ "${1:-}" = "--check" ]; then
  CHECK_MODE="--check"
fi

node "$REPO_ROOT/provider-dev/scripts/fetch_nvcf_spec.mjs"
node "$REPO_ROOT/provider-dev/scripts/harvest_ngc_spec.mjs"
node "$REPO_ROOT/provider-dev/scripts/harvest_ngc_sdk_schemas.mjs"
node "$REPO_ROOT/provider-dev/scripts/pin_specs.mjs" $CHECK_MODE

echo "Done. Upstream inputs in $REPO_ROOT/provider-dev/downloaded"
