# `nvidia` provider for [`stackql`](https://github.com/stackql/stackql)

StackQL provider for the NVIDIA NGC platform - organizations, users, the private registry and catalog (containers, models, resources, helm charts), and NVIDIA Cloud Functions (NVCF: functions, versions, deployments, cluster groups, GPUs, queues). Query and provision the NGC control plane with SQL: GPU and cluster-group inventory, NVCF function fleet state, registry and model estate audits, and org membership.

## Positioning

There is no Terraform provider for the NGC/NVCF control plane. The reason is structural: the Terraform model requires a Go SDK to vendor, and NVIDIA's ecosystem is Python-first (the NGC CLI and `ngcsdk` are Python; no stable Go SDK exists). StackQL's build chain is spec -> provider, with no language binding in between, so this control plane is reachable without anyone first authoring a Go client.

## Design Principles

- **Bearer auth with an NGC Personal API Key** - `Authorization: Bearer` with the key in `NGC_API_KEY`. Keys need the Private Registry service scope and, for NVCF, Cloud Functions at the organization level (NVIDIA's own docs warn that team-level roles break NVCF keys).
- **Org scoping** - registry and org resources are scoped by `org_name`; it is the universal scoping parameter.
- **NVCF is the flagship service** - functions and versions (CRUD), deployment specifications, cluster groups and GPUs (`SELECT` inventory), queues, and authorizations (function sharing: authorize = `INSERT`, list = `SELECT`, revoke = `DELETE`).
- **Deprecation-aware mapping** - NVIDIA publishes a formal NGC API deprecation schedule; team-scoped paths (`/team/{team}` segments) end September 2026. Org-scoped paths are mapped; team-scoped twins are skipped with a `deprecated` reason code citing the schedule.
- **Registry resources are metadata** - container images, models, resources, and helm charts map as metadata reads (and writes where the API supports them); artifact binary push/pull is the registry data plane and out of scope.
- **Deterministic builds** - every step is a re-runnable script; manual mapping decisions are rules in scripts, never hand-edits to derived artifacts.

Sibling-build findings are reused, not re-derived: dockerhub (registry-shaped resources, public-read classification), proxmox (async polling, mock-first CI), vsphere (skip-with-notice access gating), snowflake/prefect (invocation scoping frameworks), keycloak (REPLACE-vs-UPDATE semantics), oci (deprecation-aware mapping).

## Prerequisites

- Node.js >= 20
- npm
- a local `stackql` binary for testing (`$STACKQL`, `./stackql`, or on `PATH`)
- an NGC account with a Personal API Key in `NGC_API_KEY` (live tests only; catalog reads and the mock-backed suites run without one)

```bash
npm install
```

## 1. Acquire, Pin, Clean the Upstream Specs

Two spec sources:

1. **NVCF** - a published OpenAPI spec served by the NVCF API itself. Management operations are served from `api.ngc.nvidia.com/v2/nvcf`; invocation and queue-detail operations from `api.nvcf.nvidia.com` - two hosts, carried per operation group.
2. **NGC core** - the API reference at `docs.ngc.nvidia.com/api/` is a spec-driven explorer over per-service definitions; `harvest_ngc_spec.mjs` retrieves the definitions behind it and `clean_specs.mjs` normalizes them with a full fix report.

```bash
npm run fetch-specs          # download NVCF spec + harvest NGC definitions, record pins
npm run clean-specs          # validate + repair, write provider-dev/downloaded/cleaned + fix report
npm run fetch-specs -- --check   # CI drift check against the recorded pins
```

Pins (URL, date, sha256) live in `provider-dev/config/spec_pin.json`, including the harvest-vs-fallback decision for the NGC core source. The downloaded specs are committed: NVIDIA versions neither URL, so the pinned bytes in-repo are the reproducible input.

## 2. Split into Service Specs

```bash
npm run split -- --provider-name nvidia --overwrite
```

Service assignment is a deterministic rule set in `provider-dev/scripts/service_rules.mjs`; the service list is recorded in `provider-dev/config/service_names.json`.

## 3. Generate Mappings

```bash
npm run generate-mappings -- --provider-name nvidia --input-dir provider-dev/source --output-dir provider-dev/config
node provider-dev/scripts/map_operations.mjs
```

`map_operations.mjs` populates the StackQL resource/method/verb columns in `provider-dev/config/all_services.csv` from the endpoint inventory (`provider-dev/config/endpoint_inventory.csv`, produced by `build_inventory.mjs` - the single source of truth for classification). It validates that every generator-relevant operation is mapped or explicitly skipped with a reason code, that method names are unique per resource, and that overloaded SQL verbs have unique required-parameter signatures - and fails without writing on any violation.

## Service Coverage

489 upstream operations inventoried (54 NVCF, 435 NGC core); 221 mapped (101 select, 40 insert, 29 update, 32 delete, 3 replace, 16 exec), 268 skipped with reason codes (141 deprecated team-scoped twins per the NGC deprecation schedule, 36 deprecated-inline, 34 internal-admin, 23 service-infra, 22 data-plane file transfer, 12 other), 81 resources across 7 services:

| Service | Resources | Contents |
|---|---|---|
| `orgs` | 8 | organizations, teams, users, role grants, invitations, current user |
| `registry` | 32 | org-scoped artifact metadata: models, resources, recipes, helm chart versions, collections, shares, encryption keys |
| `catalog` | 21 | guest artifact metadata reads plus the GPU and CSP catalogs |
| `nvcf_functions` | 7 | functions, versions, metadata, authorizations (sharing grants), secrets, rate limits |
| `nvcf_deployments` | 7 | deployments, GPU specs, cluster groups and GPUs, registry credentials, telemetries |
| `nvcf_queues` | 2 | queue details, queue position |
| `nvcf_invocation` | 4 | HTTP-polling invocation (pexec + status), assets, assertion tokens |

**Public reads need no auth.** Catalog artifact metadata and the GPU catalog serve unauthenticated (wire-proven) - start there before any account setup. Function sharing maps as grants-as-data: authorize = `INSERT`, list = `SELECT`, revoke = `DELETE`.

Engineering findings, open questions and phase 2 obligations are in [NOTES.md](NOTES.md).

## License

MIT
