# CLAUDE.md

## Project

This repository builds and documents the `nvidia` provider for [StackQL](https://github.com/stackql/stackql), enabling SQL-based query and provisioning operations against the NVIDIA NGC platform - organizations, users, the private registry and catalog (containers, models, resources, helm charts), and NVIDIA Cloud Functions (NVCF: functions, versions, deployments, cluster groups, GPUs, queues).

**Sibling scope notes, recorded so they are never relitigated**: Run:ai (published OpenAPI, its own control plane) and DGX Cloud Lepton are reserved future siblings, out of scope here. The NIM/API-catalog inference endpoints (`integrate.api.nvidia.com`, OpenAI-compatible) are a data-plane LLM surface, not a control plane - out of scope. NVCF function *invocation* is scoped by the inventory (see design principles); streaming and gRPC invocation forms are skipped per the standing exclusions.

The provider is built using the `@stackql/provider-utils` package and follows the repository pattern established in [`stackql-registry/stackql-provider-k8s`](https://github.com/stackql-registry/stackql-provider-k8s/tree/feature/provider-dev) (branch `feature/provider-dev`). Sibling-build NOTES.md findings are reused, not re-derived - dockerhub (registry-shaped resources, public-read surface), proxmox/vsphere (mock-first CI where live access is gated), snowflake/prefect (body-driven invocation decision frameworks), oci (deprecation-aware mapping).

## Positioning context

There is no Terraform provider for the NGC/NVCF control plane - and the reason is structural, not neglect: the Terraform model requires a Go SDK to vendor, and NVIDIA's ecosystem is Python-first (the NGC CLI and `ngcsdk` are Python; no stable Go SDK exists). StackQL's build chain has no language binding in it - spec -> provider - so this domain is reachable where the resource/state model cannot follow without someone first authoring a Go client. This provider is the proof case for that argument; the README states it once, factually, and the docs otherwise lead with capability statements and runnable examples, never editorializing. The query surfaces that matter: GPU and cluster-group inventory, NVCF function fleet state, registry/model estate audit, and org membership - the AI infrastructure control plane as data.

## Spec sources: one published, one harvested

Two sources, resolved and pinned in phase 1:

1. **NVCF** - a published OpenAPI spec (linked from the NVCF documentation, with a companion Postman collection), covering function management, deployments, cluster groups and GPUs, queue details, and authorizations. Record the canonical spec URL, fetch, validate, pin. Management operations are served from `api.ngc.nvidia.com/v2/nvcf`; invocation/queue-detail operations from `api.nvcf.nvidia.com` - two hosts, carried per operation (the elasticsearch per-service-server precedent, here per-method-group).
2. **NGC core** - the API reference at `docs.ngc.nvidia.com/api/` is a spec-driven explorer whose underlying definition is currently flagged as lacking a standard version field. Phase 1 harvests that definition, and `clean_specs.mjs` normalizes it (stamp/repair the version field, whatever else swagger-parser flags) with a full fix report. **Fallback, as a recorded decision only if the harvest proves unusable**: derive the NGC core spec from the `ngcsdk` Python SDK (archetype 2) - the decision and evidence go in `provider-dev/config/spec_pin.json` either way.

**Deprecation-aware mapping**: NVIDIA publishes a formal NGC API deprecation schedule - notably, team-scoped paths (`/teams/{team}` segments) end September 2026. Org-scoped paths are mapped; team-scoped twins are skipped with a `deprecated` reason code citing the schedule. The pin-and-diff CI job watches the deprecation page as well as the specs.

## Design principles

- **Bearer auth, NGC Personal API Key** - `Authorization: Bearer` with `NGC_API_KEY`. The docs cover key generation with the required service scopes (Private Registry, and Cloud Functions at the *organization* level - NVIDIA's own docs warn team-level roles break NVCF keys), and note the legacy-key type exists but personal keys are the documented path. Key scopes are static (no rotation of scope) - noted for users.
- **Org scoping** - registry and org resources live under `/v2/org/{org_name}/...`; `org_name` is the universal scoping parameter (the `compartmentId` role). Catalog/public reads may work without org scope (and possibly without auth - the dockerhub public-read precedent; confirm in phase 1 and, if so, lead the docs with the zero-setup entry point).
- **NVCF is the flagship service** - functions and versions (CRUD), deployment specifications (GPU type, instance counts - deep config blobs), cluster groups and GPUs (`SELECT` inventory - the GPU estate demo), queues, and authorizations (function sharing as the grants-as-data pattern: authorize = `INSERT`, list = `SELECT`, revoke = `DELETE`).
- **Invocation is scoped, not assumed** - HTTP-polling invocation (`invoke` returning a request ID, poll for status) may map as `EXEC` plus a status `SELECT` per the proxmox async precedent if the shapes are clean; streaming/gRPC forms are reason-coded skips. The inventory decides with the snowflake/prefect frameworks; management-first is the v1 posture.
- **Registry resources are metadata** - container images, models, resources, and helm charts map as metadata reads (and writes where the API supports them); artifact binary push/pull is the registry data plane, skipped per the standing exclusions (the dockerhub scope precedent).
- **Pagination is an inventory question** - NGC/NVCF pagination idioms are recorded per resource from the specs and confirmed live; no assumption carries from siblings.

## Toolchain rules

- Use the **latest** `@stackql/provider-utils` (see [npm](https://www.npmjs.com/package/@stackql/provider-utils)). Check for a newer version before starting work; do not pin to an old minor.
- Node.js >= 20. `type: module` in package.json.
- Wrap the two CLI entry points (`provider-dev-utils.mjs`, `docgen-utils.mjs`) as npm scripts, invoked through `node` (not `.bin` shims). Pass flags with npm's `--` separator.
- A local `stackql` binary is required for testing (`$STACKQL`, `./stackql`, or on `PATH`).

## Repository layout

```
provider-dev/
  downloaded/          # pinned NVCF spec + harvested NGC core definition
  source/              # cleaned + split per-service specs (build artifacts)
  config/              # spec pins (incl harvest/fallback decision), service names, all_services.csv
  openapi/src/nvidia/  # generated provider output
  scripts/             # harvest_ngc_spec.mjs, clean_specs.mjs, map_operations.mjs, pre_normalize.mjs, post_process.mjs
bin/                   # thin shell/node wrappers for npm scripts (mirror k8s repo)
tests/
  integration/         # mock NGC/NVCF servers (both hosts) + row-level assertions
  fixtures/            # seed definitions for UAT objects
  smoke_test.py        # pystackql smoke suite
website/               # Docusaurus 3.10 microsite
CLAUDE.md
README.md              # k8s-README style, steps 0-8, incl the Go-SDK positioning note and sibling notes
```

## Build pipeline

Every step is deterministic and re-runnable. Manual mapping decisions are applied as rules in scripts, never hand-edits to CSVs or specs. Validate-and-fail-without-writing is the standard for every script.

### 0. Acquire, pin, clean

`bin/fetch-specs.sh` + `harvest_ngc_spec.mjs` per the spec-sources section; `clean_specs.mjs` normalizes the harvested definition (version-field repair first) and validates both sources with `@apidevtools/swagger-parser`, with per-source fix reports. Fail without writing on anything unfixable; the archetype-2 fallback is a recorded decision, not a silent switch.

### 1. Split into service specs

`npm run split` with `--provider-name nvidia`. Final service split (decided from the endpoint inventory 2026-07-14, recorded in `provider-dev/config/service_names.json`; assignment rules in `provider-dev/scripts/service_rules.mjs` are driven by the inventory CSV):

`orgs` (organizations, teams, users, role grants, invitations, current user), `registry` (org-scoped artifact metadata: models, resources, recipes, helm chart versions, collections, shares, encryption keys), `catalog` (guest artifact metadata reads plus GPU and CSP catalogs - confirmed distinct from registry: different path families and auth posture), `nvcf_functions` (functions, versions, metadata, authorizations, secrets, rate limits), `nvcf_deployments` (deployments, GPU specs, cluster groups, registry credentials, telemetries), `nvcf_queues` (queue details, position), `nvcf_invocation` (added vs the candidate list: pexec polling invocation, assets, assertion tokens - all served from `api.nvcf.nvidia.com`). No `usage` service: no billing/measurement surface exists in the harvest (the Subscription Service definition is not publicly retrievable; recorded in `download_manifest.json`).

### 2. Generate mappings

`npm run generate-mappings`, then `node provider-dev/scripts/map_operations.mjs`:

| Operation pattern | StackQL verb | Resource / method |
|---|---|---|
| GET collection | `SELECT` | `<resource>.list` (envelope/objectKey per resource from the specs) |
| GET single | `SELECT` | `<resource>.get` |
| POST create | `INSERT` | `<resource>.create` |
| PATCH/PUT update (semantics per resource; keycloak REPLACE warning applies) | `UPDATE`/`REPLACE` per finding | `<resource>.update` |
| DELETE | `DELETE` | `<resource>.delete` |
| function authorization add / remove | `INSERT` / `DELETE` | `nvcf_functions.authorizations` - grants-as-data |
| deployment create / update / delete | `INSERT`/`UPDATE`/`DELETE` | `nvcf_deployments.deployments` (deployment specs as blobs) |
| HTTP-polling invocation (if scoped in) | `EXEC` + status `SELECT` | per the proxmox async precedent |
| streaming/gRPC invocation, artifact binary transfer | skipped | reason-coded |
| team-scoped path twins | skipped | `deprecated`, citing the schedule |

Resource names are plural snake_case (`functions`, `function_versions`, `cluster_groups`, `gpus`, `models`, `helm_charts`), consistent with the sibling builds. The script validates: every generator-relevant operation mapped or explicitly skipped with a reason code, method names unique per resource, overloaded SQL verbs have unique required-parameter signatures. Fail without writing on any violation.

### 3. Normalize

`node provider-dev/scripts/pre_normalize.mjs` (harvest-specific quirks from the clean report), then `npm run normalize -- --api-dir provider-dev/source`. Expect deployment specifications, model metadata, and GPU/cluster attributes lowered to JSON-blob columns addressed with `json_extract`.

### 4. Generate the provider

```bash
rm -rf provider-dev/openapi/*
npm run generate-provider -- \
  --provider-name nvidia \
  --input-dir provider-dev/source \
  --output-dir provider-dev/openapi/src/nvidia \
  --config-path provider-dev/config/all_services.csv \
  --provider-config '{"auth": {"type": "bearer", "credentialsenvvar": "NGC_API_KEY"}}' \
  --naive-req-body-translate \
  --overwrite
```

Servers carried per operation group (`api.ngc.nvidia.com` / `api.nvcf.nvidia.com` - both fixed literals, no dotted-host concern). Pagination config per the inventory findings, at service level. Then `node provider-dev/scripts/post_process.mjs` for whatever the integration tests surface.

### 5. Test

Same four layers as the k8s repo, in order - mock-first for NVCF, per the proxmox/vsphere precedent, because NVCF requires org-level enablement that a free NGC account may lack:

1. **Offline validation** - local file registry, `SHOW SERVICES/RESOURCES/METHODS`, `DESCRIBE EXTENDED` on representative resources (`nvidia.nvcf_functions.functions`, `nvidia.nvcf_deployments.gpus`, `nvidia.registry.models`)
2. **Meta-route tests** - `npm run start-server` / `npm run test-meta-routes -- nvidia --verbose` / `npm run stop-server`
3. **Integration tests** - `tests/integration/mock_nvidia_server.mjs` (both hosts) serving real wire shapes (captured from live where accessible, from documentation examples otherwise, and marked accordingly); assert row-level results per archetype: list unwrapping per resource, org-scoped routing, a function/version `INSERT`/`UPDATE`/`DELETE` lifecycle with a deployment round trip, an authorization grants round trip, and the bearer key throughout
4. **Smoke tests** - `tests/smoke_test.py` (pystackql), tiered by access: catalog/public reads (and org/registry reads with a free NGC account) run whenever credentials allow; NVCF smokes run only where the org has Cloud Functions enabled, skip-with-notice otherwise (the vsphere capacity-degradation pattern); any function actually deployed in a smoke uses the smallest instance spec, `stackql-smoke-<stamp>` naming, and is deleted within the run, breadcrumbs swept first

Never run tests against a production organization.

### 6. Publish

Push the `nvidia` dir to `providers/src` in a feature branch of [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry) and follow the registry release flow. Verify with `registry pull nvidia` against the dev registry.

### 7. Docs microsite

`website/` is Docusaurus 3.10 following the shared architecture: shared `stackql/docusaurus-config` vendored to `.shared-config/`; site-local files limited to `website/provider.js` (`providerName = 'nvidia'`, `providerTitle = 'NVIDIA NGC'`), thin config wrappers, shared components, and `static/CNAME` pinning `nvidia-provider.stackql.io`.

- Author `headerContent1.txt` / `headerContent2.txt` in `provider-dev/docgen/provider-data/` (installation, NGC Personal API Key generation with the org-level role warning, `NGC_API_KEY`, the org scoping pattern, the NVCF-enablement note, sibling notes, example queries)
- `npm run generate-docs`, then `node website/scripts/sanitize-docs.mjs`
- Publish via GitHub Pages, DNS: `nvidia-provider.stackql.io` CNAME -> `stackql.github.io.`

Lead the docs examples with the queries this provider exists for: GPU and cluster-group inventory (what GPU capacity exists, where - the estate demo), NVCF function fleet state (functions by status, version, deployment spec, min/max instances - the GPU FinOps angle), function sharing audit (the authorizations grants query), model and container estate reports (registry contents by org, size, update recency), and one cross-provider join for the campaign: NVCF GPU allocations alongside the hyperscaler GPU instance inventory (`aws`/`azure`/`google`/`oci`) - the whole GPU estate, cloud and NGC, in one `SELECT`.

### 8. CI

GitHub Actions: acquire + pin check + clean + build, integration tests against the mock, meta-route tests, the tiered smokes (public/registry ungated where a free-account secret exists; NVCF secret-gated). The drift job watches both specs and the deprecation schedule page. Model on the k8s repo's `build-and-test.yml`.

## Writing conventions

- README and docs copy: measured, precise, no hyperbole. Third-person or passive framing for descriptive copy. The Go-SDK/Terraform structural point is stated once, factually, in the README positioning note - everywhere else, capability statements and runnable examples, never editorializing.
- No em dashes; use `-`. No characters not on a QWERTY keyboard; use `->` for arrows.
- Sample queries follow the k8s README style: realistic, runnable, `json_extract` for nested fields.

## Non-negotiables

1. Latest `@stackql/provider-utils`, always
2. The k8s `feature/provider-dev` repo is the reference pattern; sibling-build NOTES.md findings are reused, not re-derived - deviate only with a documented reason in the README
3. The harvest-vs-fallback decision for the NGC core spec is recorded with evidence - never a silent archetype switch
4. Team-scoped deprecated paths are never mapped - the deprecation schedule is a build input
5. Deterministic scripts, never hand-edits to derived artifacts
6. Every regeneration is followed by the integration test suite before commit
7. Smoke tests never leave a deployed function running - a failed run must not leave GPU-billing resources behind
