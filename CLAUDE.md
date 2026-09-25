# CLAUDE.md

## Project

This repository builds and documents the `nvidia` provider for [StackQL](https://github.com/stackql/stackql), enabling SQL-based query and provisioning operations against the NVIDIA NGC control plane: NVIDIA Cloud Functions (NVCF - functions and versions, deployments and GPU specifications, cluster groups and GPU inventory, request queues, sharing grants, HTTP-polling invocation), the NGC private registry (models, resources, recipes, generic artifacts such as helm charts, endpoints and blueprints, versions and files, collections, shares, encryption keys), the public NGC catalog, and NGC organizations, teams, users, roles and invitations.

**Scope notes, recorded so they are never relitigated**: Run:ai and DGX Cloud Lepton have their own control planes and are reserved future siblings. The NIM / API-catalog inference endpoints (`integrate.api.nvidia.com`) are a data-plane LLM surface, out of scope. Artifact binary push/pull is the registry data plane, skipped (`data-plane-file-transfer`). Streaming and gRPC invocation forms are not in the published spec; the HTTP-polling form is mapped (`nvcf_invocation`). Fleet Command, Base Command batch, subscription/billing and notification definitions are out of scope (recorded in `download_manifest.json`).

The provider is a hybrid build: paths, parameters and request bodies come from the vendor's published definitions (archetype 1), response schemas for the registry surface come from the pinned `ngcsdk` Python wheel's data classes (archetype 2, response side only). The reference implementation for structure, scripts, tests and docs is [`stackql-provider-supabase`](../../S/stackql-provider-supabase) (which followed [`stackql-provider-k8s`](../../K/stackql-provider-k8s), branch `feature/provider-dev`); sibling-build NOTES.md findings are reused, not re-derived. nvidia-specific findings live in [NOTES.md](NOTES.md) - read it before changing a mapping.

## Positioning context

NVIDIA publishes a Go Terraform provider ([`NVIDIA/terraform-provider-ngc`](https://github.com/NVIDIA/terraform-provider-ngc)) covering NVCF functions and telemetry endpoints (one resource and one data source each). State that once, factually. This provider's counter is mechanical completeness from the published definitions (342 operations, 7 services, 83 resources) and the query surfaces that matter: GPU and cluster-group inventory, NVCF fleet state by deployment specification, function sharing audits, registry estate reports, org membership - the AI infrastructure control plane as data. Capability statements and runnable examples, never editorializing.

## Spec sources (three, all pinned)

1. **NVCF** - `https://api.nvcf.nvidia.com/v3/openapi` (openapi 3.1.0, linked from the NVCF API docs). Management operations are served from `api.ngc.nvidia.com`, queue details and invocation from `api.nvcf.nvidia.com`; the host is carried per service (`nvcf_queues`, `nvcf_invocation` on the nvcf host).
2. **NGC core** - two definitions harvested from the API explorer at `docs.ngc.nvidia.com/api/` (`harvest_ngc_spec.mjs` extracts the definition list from the explorer's JS bundle): `ngc_kas.json` (orgs, teams, users; served relative to `api.ngc.nvidia.com`) and `ngc_models.json` (the Private Artifacts (Models) API: registry and catalog artifact metadata; declared on `models.ngc.nvidia.com/v1/...`, served publicly at `api.ngc.nvidia.com/v2/...` - the clean step rewrites the prefix).
3. **ngcsdk** - the models definition declares no 2xx response on 303 of 333 operations. `harvest_ngc_sdk_schemas.mjs` downloads the `ngcsdk` wheel from PyPI (pinned version + sha256), parses `registry/data/model/*.py` into JSON Schema (`ngc_sdk_schemas.json`, committed), and `clean_specs.mjs` attaches them as 200 responses by an operationId rule table (`SDK_RESPONSE_CLASSES`). A SELECT method left on the bare `Response` envelope fails the inventory, so a new read endpoint must be added to the table deliberately.

Pins (URL, date, sha256) are in `provider-dev/config/spec_pin.json`; the downloads are committed (NVIDIA versions none of these URLs). `make fetch-specs` re-downloads and fails on drift; `make refresh-specs` accepts it (review the diff). The weekly CI job also snapshots the NGC deprecation schedule page (`check_deprecation_page.mjs`, `deprecation_schedule.json`).

## Design decisions (settled - see NOTES.md for the evidence)

- **Bearer auth from `NGC_API_KEY`** (an NGC Personal API Key) - the NVIDIA Terraform provider's and the NGC CLI's variable. Two fixed hosts.
- **Org scope is a path-level server variable** - `bin/split.mjs` rebases every org-scoped operation (leading `/v2/org/{org_name}`, `/v3/orgs/{org_name}`, `/v2/artifact-registry/org/{org_name}`) onto the remainder path; `post_process.mjs` attaches a path-item `servers` template carrying `org_name` with `x-stackQL-envVar: NGC_ORG` (the Terraform variable; the clickhouse / supabase / godaddy precedent). A `WHERE org_name` value beats the environment; unset, `org_name` is required. NVCF paths carry no org (the key implies it).
- **Deprecation schedule as a build input** - NVIDIA's NGC deprecated API reference ends `/teams/{team}` scoping for NVCF, NVCT, FNDS, Skyway, SIS, SI, PYM, Infinity Manager and GDN on 2026-09-30; `SCHEDULED_DEPRECATIONS` in `build_inventory.mjs` skips those families (`deprecated-schedule-2026-09-30`). Private Registry (and Data Services) team scoping is explicitly exempt, so registry/org team-scoped paths are mapped: `*_by_team` methods on the same resources (they add `team_name` to the signature), and `team_members` / `team_member_roles` / `team_invitations` resources in `orgs`.
- **The service is `private_registry`, not `registry`** - `registry` is a reserved word in the StackQL grammar (`REGISTRY PULL`).
- **snake_case surface** - `snake_case_aliases: true` on the provider config plus `request.nativeCasing` on every method: `camel` (NVCF, JSON bodies) or `kebab` (NGC core query parameters such as `page-size`), decided per method by the inventory column `native_casing`.
- **Pagination** - NGC core collections page with zero-based `page-number` + `page-size` and echo `paginationInfo {index, totalPages}`; `post_process` configures any-sdk's `page_number` algorithm per list method and pushes `LIMIT` to `page-size`. NVCF collections are unpaginated.
- **objectKey** - list envelopes unwrap their array property, entity envelopes their object property; when several qualify the property named after the resource wins (`modelVersion` for `model_versions`). Entities with array fields (GPU catalog rows) get none.
- **Opaque bodies and scalar lists** - the pexec invocation body is a `{body}` wrapper plus request transform; `function_ids` and the invocation status body are re-shaped by response transforms.
- **Verbs** - GET list/get `SELECT`, POST create `INSERT`, PATCH/PUT `UPDATE` (PUT is not `REPLACE` without field-drop evidence - keycloak rule; the one PUT with a PATCH twin, `artifacts.replace`, is `REPLACE`), DELETE `DELETE`, actions `EXEC`; grants-as-data for authorizations, shares, roles and team membership (add = `INSERT`, remove = `DELETE`).
- **Skip codes** (160 operations): `service-infra`, `internal-admin`, `deprecated-inline`, `superseded-by-v3-twin`, `non-generator-http-verb`, `data-plane-file-transfer`, `non-json-response`, `non-projectable-response`, `legacy-twin`, `duplicate-endpoint-family`, `inbound-webhook-not-client-api`, `deprecated-schedule-2026-09-30`.

## Toolchain rules

- Use the **latest** `@stackql/provider-utils` and `@stackql/pgwire-lite` (check npm before starting work; do not pin to an old minor). Node.js >= 20, `type: module`.
- Docusaurus 3.10.x for the microsite; `showLastUpdateTime` is flipped on in `website/docusaurus.config.js`.
- WSL is the execution environment on this machine (GNU make, bash, a `stackql` binary on PATH, Python 3, yarn). Node steps also run from Windows.
- The two CLI entry points (`provider-dev-utils.mjs`, `docgen-utils.mjs`) are npm scripts invoked through `node`; the Makefile is the operator surface (`make help`).

## Repository layout

    Makefile               # the pipeline: make all / make upgrade / make test / make smoke ...
    bin/                   # fetch-specs.sh, split.mjs, server lifecycle, test-meta-routes.cjs
    provider-dev/
      downloaded/          # pinned NVCF spec, harvested NGC definitions, ngc_sdk_schemas.json (all committed), cleaned/
      config/              # spec_pin.json, servers.json, service_names.json, endpoint_inventory.csv, all_services.csv, clean_report.json, deprecation_schedule.json
      scripts/             # fetch_nvcf_spec, harvest_ngc_spec, harvest_ngc_sdk_schemas, pin_specs, clean_specs, build_inventory, service_rules, map_operations, pre_normalize, post_process, check_deprecation_page, lib/inventory
      source/              # split + normalized per-service specs (build artifacts, committed)
      openapi/src/nvidia   # generated provider output (committed)
      docgen/provider-data # headerContent1.txt / headerContent2.txt (landing page)
    tests/
      offline_validation.mjs
      integration/         # mock_nvidia_server.mjs (both hosts), run_integration_tests.mjs, registry.mjs, probe.mjs
      smoke_test.py        # pystackql live suite (--live, --read-only, --with-nvcf-deploy, --cleanup-only)
    website/               # Docusaurus microsite (shared stackql/docusaurus-config vendored at build)
    .github/workflows/     # build-and-test.yml (pin check, build, drift gate, 3 test layers, gated smoke, weekly upstream drift), web deploys

## Build pipeline

`make all` runs deps -> fetch-specs (drift check) -> pin-check -> clean-specs -> inventory -> split -> mappings -> pre-normalize -> normalize -> generate (+ post-process) -> test-offline -> test-integration -> test-meta -> docs -> website. Every step is deterministic and re-runnable; manual mapping decisions are rules in `build_inventory.mjs` (the classify functions), response-class rules in `clean_specs.mjs`, and fixes in `pre_normalize.mjs` / `post_process.mjs` - never hand-edits to CSVs, specs or generated output. `endpoint_inventory.csv` is the single source of truth every later step reads (service, resource, method, verb, objectKey, host, org rebase, casing, pagination). `all_services.csv` is committed as the durable record of every operation -> resource.method mapping; `map_operations.mjs` prints the diff against the committed file, and a diff there is a breaking-change review, not noise. Validate-and-fail-without-writing is the standard for every script.

## Tests

1. `make test-offline` - `SHOW`/`DESCRIBE` against the local file registry (services, resources, verbs, the `NGC_ORG` behaviour, snake aliases, transforms).
2. `make test-integration` - the mock NGC + NVCF API (`tests/integration/mock_nvidia_server.mjs`, real wire shapes, bearer enforced, both hosts) with row-level assertions per archetype. `tests/integration/probe.mjs "<sql>"` prints stackql output and the wire calls for ad-hoc binding checks.
3. `make test-meta` - the meta-route walk over a local server.
4. `make smoke` / `make smoke-live` / `make smoke-read-only` / `make smoke-nvcf` / `make smoke-cleanup` - live, from `.env` (`NGC_API_KEY`, `NGC_ORG`, optional `NGC_TEAM`). Tiered: public catalog, org/registry reads plus a free registry model lifecycle, NVCF reads plus an undeployed function lifecycle where Cloud Functions is enabled (auto-detected, skip-with-notice otherwise). Only the gated `smoke-nvcf` target deploys anything (smallest instance, always torn down).

Never run tests against a production organization.

## Publish and docs

Push the `nvidia` dir to `providers/src` in a feature branch of [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry) and follow the registry release flow; verify with `registry pull nvidia` from the dev registry and `make smoke-live`. Docs: `make docs` (generate + sanitize) then `make website`; GitHub Pages with `nvidia-provider.stackql.io` CNAME -> `stackql.github.io.`.

## Writing conventions

- README and docs copy: measured, precise, no hyperbole. Third-person or passive framing for descriptive copy. The Terraform provider is mentioned once, factually.
- No em dashes; use `-`. No characters not on a QWERTY keyboard; use `->` for arrows.
- Sample queries follow the k8s README style: realistic, runnable, `json_extract` for nested fields.

## Non-negotiables

1. Latest `@stackql/provider-utils`, always
2. The supabase / k8s repos are the reference pattern; sibling-build NOTES.md findings are reused, not re-derived - deviate only with a documented reason in NOTES.md
3. The three upstream inputs are pinned with evidence; the response-side SDK derivation is a recorded decision in `spec_pin.json` and `download_manifest.json`, never a silent switch
4. The deprecation schedule is a build input: scheduled families are never mapped, exempt families are never blanket-skipped
5. Deterministic scripts, never hand-edits to derived artifacts
6. Every regeneration is followed by `make test` before commit
7. Smoke tests never leave a deployed function running - a failed run must not leave GPU-billing resources behind
