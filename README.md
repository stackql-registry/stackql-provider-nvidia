# `nvidia` provider for [`stackql`](https://github.com/stackql/stackql)

This repository generates and documents the `nvidia` provider for StackQL, enabling SQL-based query and provisioning operations against the NVIDIA NGC control plane: NVIDIA Cloud Functions (NVCF - functions and versions, deployments and GPU specifications, cluster groups and GPU inventory, request queues, sharing grants, HTTP-polling invocation), the NGC private registry (models, resources, recipes, helm charts and other artifacts as metadata, collections, shares, encryption keys), the public NGC catalog, and NGC organizations, teams, users, roles and invitations. The provider is built using the `@stackql/provider-utils` package.

## Positioning

NVIDIA publishes a Go Terraform provider, [`NVIDIA/terraform-provider-ngc`](https://github.com/NVIDIA/terraform-provider-ngc), covering NVCF functions and telemetry endpoints (one resource and one data source each); it reads `NGC_API_KEY`, `NGC_ORG` and `NGC_TEAM`, and this provider uses the same variables. The surface here is generated mechanically from the published NVCF OpenAPI document and the NGC API definitions behind the NGC API explorer: 342 operations across 7 services and 83 resources, with response schemas for the registry taken from the `ngcsdk` Python SDK's data classes. The query surfaces that matter: GPU and cluster-group inventory, NVCF function fleet state by deployment specification, function sharing audits, registry and model estate reports, and org membership - the AI infrastructure control plane as data.

## Design Principles

- **Bearer auth with an NGC Personal API Key** - `Authorization: Bearer` with the key in `NGC_API_KEY`. Keys need the Private Registry service scope for the registry service and, for NVCF, Cloud Functions at the organization level (NVIDIA's own docs warn that team-level roles break NVCF keys).
- **Org scope is a server variable** - registry and organization resources are scoped by `org_name`, resolved from `NGC_ORG` via `x-stackQL-envVar`; a `WHERE org_name` value always wins. NVCF paths carry no org (the key implies it).
- **Two hosts, one provider** - NVCF management, the registry, the catalog and organizations are served from `api.ngc.nvidia.com`; queue details and invocation from `api.nvcf.nvidia.com`, carried per service.
- **Deprecation-aware mapping** - NVIDIA's NGC deprecated API reference ends team-scoped (`/teams/{team}`) paths for NVCF and sibling services on 2026-09-30; those families are excluded by rule. Private Registry team scoping is exempt from that schedule and stays mapped as `*_by_team` methods on the same resources.
- **Registry resources are metadata** - artifact binary push/pull is the registry data plane and out of scope; streaming and gRPC invocation are not in the published spec, the HTTP-polling form is mapped.
- **snake_case surface** - columns, parameters and body attributes are snake_case aliases of the camelCase and kebab-case wire names.
- **Deterministic builds** - every step is a re-runnable `make` target; manual mapping decisions are rules in scripts, never hand-edits to derived artifacts; `all_services.csv` is committed as the durable record of every operation-to-method mapping.

Sibling-build findings are reused, not re-derived: supabase (the project-scope server template, offline validation and mock-server layers), k8s (mock-first CI, meta-route walk, snake_case aliases), clickhouse, godaddy, dockerhub, proxmox, vsphere, keycloak and vercel precedents are cited in [NOTES.md](NOTES.md).

## Prerequisites

To build or test the provider you will need:

1. Node.js 20+ and GNU make (for the build pipeline)
2. StackQL CLI installed (see [StackQL](https://github.com/stackql/stackql)) - `$STACKQL`, `./stackql`, or on `PATH`
3. Python 3 (a venv with `pystackql` is created on demand for the smoke suite)
4. yarn (for the docs microsite)
5. For live tests only: an NGC account with a Personal API Key in `NGC_API_KEY` and an organization name in `NGC_ORG` (see `.env.example`); the public catalog, the mock-backed integration suite and every other layer run without one

## Build with make

Every pipeline stage below is wrapped as a `make` target ([Makefile](Makefile)); `make all` runs the full chain - upstream drift check, clean, inventory, split, mappings, normalize, generate, post-process, all credential-free tests, docs and the website build - and can be used at any stage to produce and test a new provider and docs. `make upgrade` is the same chain but accepts upstream changes (re-pins the specs):

```bash
make all              # deps -> fetch-specs (drift check) -> build -> test -> docs -> website
make upgrade          # deps -> refresh-specs (accept upstream) -> build -> test -> docs -> website
make help             # list all targets
```

Individual stages (each corresponds to a numbered section below):

| Target | Purpose |
|---|---|
| `make deps` | install node dependencies |
| `make fetch-specs` / `make refresh-specs` | download the NVCF spec, harvest the NGC definitions and the ngcsdk schemas; verify against the pins / accept the change |
| `make clean-specs` | deterministic spec repairs and validation |
| `make inventory` | classify every operation into `endpoint_inventory.csv` |
| `make split` | per-service specs on their hosts, org-scoped paths rebased |
| `make mappings` | regenerate and validate `all_services.csv` |
| `make pre-normalize normalize` | lower polymorphism in the service specs |
| `make generate` | generate the provider (runs `post-process` automatically) |
| `make test` | offline + integration + meta-route test layers (no account required) |
| `make smoke` | live smoke suite against the locally generated provider (needs `NGC_API_KEY`, `NGC_ORG`) |
| `make smoke-live` | live smoke suite against the published provider in the public registry |
| `make docs website` | generate the doc pages and build the microsite |

The smoke targets source a gitignored `.env` file if present (`NGC_API_KEY`, `NGC_ORG`, optional `NGC_TEAM`; see `.env.example`).

## 1. Acquire, Pin, Clean the Upstream Specs (`make fetch-specs`, `make clean-specs`)

Three pinned inputs (`provider-dev/config/spec_pin.json`: URL, date, sha256; the downloads are committed since NVIDIA versions none of these URLs):

1. **NVCF** - the published OpenAPI spec served by the NVCF API itself (`https://api.nvcf.nvidia.com/v3/openapi`, linked from the NVCF API docs).
2. **NGC core** - `provider-dev/scripts/harvest_ngc_spec.mjs` downloads the per-service definitions behind the NGC API explorer (`docs.ngc.nvidia.com/api/`) from their pinned URLs: the NGC API definition (orgs, teams, users - served by the public gateway at `api.ngc.nvidia.com/v3/api-docs`) and the Private Artifacts (Models) API (registry and catalog artifact metadata, from `models.ngc.nvidia.com`). The definitions that refuse public connections are recorded in `download_manifest.json`.
3. **ngcsdk** - the July 2026 models definition declared no 2xx response on 303 of its 333 operations. `harvest_ngc_sdk_schemas.mjs` downloads the `ngcsdk` wheel from PyPI (pinned version and sha256), converts its auto-generated data classes (`registry/data/model/*.py`) to JSON Schema, and the clean step attaches them as 200 responses to any operation that lacks one. The current definition ships responses on every operation, so the rule injects nothing today; it stays as the recorded fallback.

```bash
npm run fetch-specs -- --check   # download + verify against the pins (fails on drift)
npm run fetch-specs              # download + re-pin (accept upstream changes)
npm run clean-specs              # repairs + swagger-parser validation, fix report in provider-dev/config/clean_report.json
```

`clean_specs.mjs` applies deterministic repair rules with a per-source report: the relative server on the NGC definition, the `/v1` -> `/v2` public-gateway prefix on the models definition, snake_case path parameters throughout, path parameters whose declared name does not match their template token, cookie parameters (unsupported by the engine), query parameters with prose names, and the SDK response injection. It fails without writing on anything unfixable.

## 2. Inventory and Split (`make inventory`, `make split`)

`build_inventory.mjs` classifies every operation of the cleaned specs into `provider-dev/config/endpoint_inventory.csv` - host, org and team scoping, the org-scope rebase (`org_prefix`, `rebased_path`, `server_url`), declared auth and wire-observed public reads, pagination parameters, wire casing, response shape and objectKey candidate, the proposed service / resource / method / SQL verb, and a skip reason where applicable. The deprecation schedule is applied here as a rule (`SCHEDULED_DEPRECATIONS`). The CSV is the single source of truth every later step reads; it fails without writing on an unclassified operation, a duplicate method, a rebase collision, a service spanning two hosts, or a SELECT method without a projectable response.

```bash
npm run build-inventory
npm run split -- --provider-name nvidia --overwrite
```

The split assigns operations to services from the inventory, sets each service's root server (host) and title (`provider-dev/config/service_names.json`), and rebases org-scoped operations: the leading org prefix (`/v2/org/{org_name}`, `/v3/orgs/{org_name}`, `/v2/artifact-registry/org/{org_name}`) is removed from the path and the org path parameter dropped, to be re-attached as a server template in post-processing.

| Service | Resources | Contents |
|---|---|---|
| `orgs` | 11 | organizations, teams, users, team members and member roles, role grants, invitations, current user |
| `private_registry` | 31 | org-scoped artifact metadata: models, resources, recipes, generic artifacts (helm charts, endpoints, blueprints, agents, playbooks, APIs, skills), versions and files, collections, shares, deployment parameters, encryption keys, workflows; `*_by_team` twins |
| `catalog` | 21 | public artifact metadata reads plus the GPU and cloud service provider catalogs, NIM metadata publishing |
| `nvcf_functions` | 7 | functions, versions, function ids, metadata, authorizations (sharing grants), secrets, rate limits |
| `nvcf_deployments` | 7 | deployments and GPU specifications, cluster groups and GPUs, registry credentials, telemetries |
| `nvcf_queues` | 2 | queue details, queue position |
| `nvcf_invocation` | 4 | HTTP-polling invocation (pexec + status), assets, assertion tokens |

## 3. Generate Mappings (`make mappings`)

```bash
rm -f provider-dev/config/all_services.csv
npm run generate-mappings -- --provider-name nvidia --input-dir provider-dev/source --output-dir provider-dev/config
npm run map-operations
```

`map_operations.mjs` fills the `stackql_resource_name`, `stackql_method_name`, `stackql_verb` and `stackql_object_key` columns from the inventory (joined by service and operationId), validates that every operation is mapped, that method names are unique per resource and that overloaded SQL verbs have unique path-parameter signatures, prints the mapping diff against the committed `all_services.csv` (a diff there is a breaking-change review, not noise), and fails without writing on any violation.

| Operation pattern | StackQL verb | Resource / method |
|---|---|---|
| GET collection | `SELECT` | `<resource>.list` (objectKey per envelope: `$.models`, `$.functions`, `$.clusterGroups`, ...) |
| GET single | `SELECT` | `<resource>.get` (entity envelopes unwrapped: `$.model`, `$.function`, `$.user`, ...) |
| POST create | `INSERT` | `<resource>.create` |
| PATCH / PUT update | `UPDATE` (PUT with a PATCH twin: `REPLACE`) | `<resource>.update` / `replace` |
| DELETE | `DELETE` | `<resource>.delete` |
| team-scoped registry twins | same verb | `<resource>.<method>_by_team` |
| function sharing add / remove / set | `INSERT` / `DELETE` / `REPLACE` | `nvcf_functions.authorizations` - grants-as-data |
| shares, role grants, team membership | `INSERT` / `DELETE` | `*_shares`, `user_roles`, `team_members`, ... |
| HTTP-polling invocation | `EXEC` + status `SELECT` | `nvcf_invocation.invocations.invoke`, `invocation_status.get` |
| actions (purge, stash, malware scan, resend, api-key mint, ...) | `EXEC` | on the owning resource |
| streaming / gRPC invocation, artifact binary transfer, admin and infra endpoints, scheduled team-scoped families | skipped | reason-coded in the inventory |

## 4. Normalize the Service Specs (`make pre-normalize normalize`)

```bash
npm run pre-normalize
npm run normalize -- --api-dir provider-dev/source
```

`pre_normalize.mjs` lowers OpenAPI 3.1 constructs (type arrays, numeric exclusive bounds) and strips the models definition's per-operation `x-ssa-scopes` security hints. `npm run normalize` (provider-utils) then flattens composition, converts opaque objects to JSON-blob strings, lifts path-item parameters onto operations and wraps bare-array responses (the GPU catalog).

## 5. Generate Provider (`make generate`)

```bash
rm -rf provider-dev/openapi/*
npm run generate-provider -- \
  --provider-name nvidia \
  --input-dir provider-dev/source \
  --output-dir provider-dev/openapi/src/nvidia \
  --config-path provider-dev/config/all_services.csv \
  --provider-config '{"auth": {"type": "bearer", "credentialsenvvar": "NGC_API_KEY"}, "snake_case_aliases": true}' \
  --naive-req-body-translate \
  --overwrite
npm run post-process
```

No `--servers` or `--service-config` is passed: servers are per service (two hosts) and the org templates, casing and pagination are per method, all driven by the inventory in `post_process.mjs`, which applies:

- **Org server templates** - every rebased path item gets a path-level `servers` template (`https://api.ngc.nvidia.com/v2/org/{org_name}` and the v3 / artifact-registry forms) whose `org_name` variable carries `x-stackQL-envVar: NGC_ORG`. any-sdk resolves servers operation -> path item -> document, so the override applies to those operations only; it is applied after generation because normalize strips path-level servers.
- **Casing** - `request.nativeCasing: camel` (NVCF and JSON bodies) or `kebab` (methods with kebab query parameters such as `page-size`, `resolve-labels`) on every method, paired with `snake_case_aliases` on the provider.
- **Pagination and LIMIT pushdown** - NGC core collections page with zero-based `page-number` + `page-size` and echo `paginationInfo {index, totalPages}`; the `page_number` algorithm is configured per list method and `LIMIT n` is pushed to `page-size`.
- **Opaque bodies and scalar lists** - the pexec invocation body becomes a `{body}` wrapper with a request transform; `function_ids` and the invocation status body are re-shaped by response transforms.

### Organization scope

```bash
export NGC_API_KEY='nvapi-...'
export NGC_ORG='0123456789ab'     # org_name default; a WHERE org_name value always wins
```

```sql
SELECT name, framework, latest_version_id_str, updated_date
FROM nvidia.private_registry.models;

SELECT name FROM nvidia.private_registry.models WHERE org_name = 'another-org';
SELECT name FROM nvidia.private_registry.models WHERE team_name = 'ml-platform';   -- the *_by_team twin
```

With `NGC_ORG` unset, `org_name` is a required parameter on every org-scoped method (visible in `SHOW METHODS`).

## 6. Test Provider (`make test`)

### Validate offline (`make test-offline`)

[tests/offline_validation.mjs](tests/offline_validation.mjs) runs `SHOW SERVICES` / `SHOW RESOURCES` / `SHOW METHODS` / `DESCRIBE EXTENDED` against the local file registry and asserts the service and resource lists, verbs and required parameters, the `NGC_ORG` behaviour (`org_name` required only when unset), snake aliases and the transforms - no network, no server.

### Integration tests (`make test-integration` - mock NGC + NVCF, no account required)

[tests/integration/mock_nvidia_server.mjs](tests/integration/mock_nvidia_server.mjs) plays both hosts with real wire shapes (the `{<entities>, paginationInfo, requestStatus}` envelopes, the bare-array GPU catalog, the NVCF `{functions}` / `{function}` envelopes, the 202 + `NVCF-REQID` invocation) and enforces the bearer token. [run_integration_tests.mjs](tests/integration/run_integration_tests.mjs) materialises a test copy of the provider pointed at the mock and asserts row-level results: envelope unwrapping, pagination over three pages and `LIMIT` pushdown, `NGC_ORG` resolution and override, the `*_by_team` routing, kebab and camel casing on the wire, a registry model lifecycle, the NVCF function / authorization / deployment lifecycles, queue details on the second host, the polling invocation and a 404. `tests/integration/probe.mjs "<sql>"` prints stackql's output and the wire calls for ad-hoc checks.

```bash
npm run test-integration            # add -- --verbose for per-query output
```

### Meta-route test suite (`make test-meta`)

Starts a StackQL wire server against the local registry and walks every service, resource and method, asserting that every resource has methods, that no two methods on the same SQL verb share a required-parameter signature, and that every selectable resource yields a non-empty `DESCRIBE EXTENDED`.

### Smoke tests

[tests/smoke_test.py](tests/smoke_test.py) (pystackql) runs against a real NGC organization, tiered by what the credentials can reach: the public catalog; organization and registry reads plus a free registry model `INSERT` / `UPDATE` / `DELETE`; NVCF reads (cluster groups and GPUs, fleet state) plus an undeployed function `INSERT` / version get / authorizations / `DELETE` where Cloud Functions is enabled (auto-detected, skipped with a notice otherwise). Everything it creates is named `stackql-smoke-<stamp>` and breadcrumbs are swept first. Only the gated deploy lifecycle costs anything:

```bash
make smoke                 # local provider (creates a pystackql venv on demand)
make smoke-live            # --live: the published provider in the stackql registry
make smoke-read-only       # reads only
make smoke-nvcf            # + deploy the smoke function on the smallest instance type, wait, undeploy (billable minutes, well under $1; needs NVCF_SMOKE_CONTAINER_IMAGE)
make smoke-cleanup         # just sweep breadcrumbs
```

Never run tests against a production organization.

### CI

[.github/workflows/build-and-test.yml](.github/workflows/build-and-test.yml) rebuilds the provider from the committed pins on every push and PR (`make build`), fails on uncommitted generation drift, and runs the offline, integration and meta-route layers plus the docs generation. On pushes it runs the live smoke suite where the `NGC_API_KEY` / `NGC_ORG` secrets exist (never the deploy lifecycle). A weekly job re-downloads every upstream input, diffs it against the pins, snapshots the NGC deprecation schedule page, and opens an issue when anything moves. The docs microsite deploys separately via the web workflows.

## 7. Publish the Provider

To publish, push the `nvidia` dir to `providers/src` in a feature branch of the [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry). Follow the [registry release flow](https://github.com/stackql/stackql-provider-registry/blob/dev/docs/build-and-deployment.md).

Pull and verify from the dev registry:

```bash
export DEV_REG="{ \"url\": \"https://registry-dev.stackql.app/providers\" }"
stackql --registry="${DEV_REG}" shell
```

```sql
registry pull nvidia;
```

## 8. Generate Web Docs (`make docs website`)

The doc microsite (`website/`) is Docusaurus 3.10 and follows the shared architecture used by the other provider microsites: all navbar/footer/theme/plugin configuration lives in [`stackql/docusaurus-config`](https://github.com/stackql/docusaurus-config), vendored into `.shared-config/` at build time. Site-local files are limited to the provider identity (`website/provider.js`), thin wrappers (`docusaurus.config.js` - which also flips `showLastUpdateTime` on so every page is date-stamped - and `sidebars.js`), the shared components under `src/`, and static assets including `static/CNAME`.

a. `headerContent1.txt` and `headerContent2.txt` in `provider-dev/docgen/provider-data/` are injected into the docs landing page (installation, authentication, organization scope, pagination, deprecations, example queries)

b. Generate the docs on the snake_case surface and sanitize them for MDX v3:

```bash
npm run generate-docs -- \
  --provider-name nvidia \
  --provider-dir ./provider-dev/openapi/src/nvidia/v00.00.00000 \
  --output-dir ./website \
  --provider-data-dir ./provider-dev/docgen/provider-data \
  --snake-case-aliases
npm run sanitize-docs
```

c. Build and test locally (yarn, Node 20+; the build vendors the shared config, so network access to GitHub is required):

```bash
cd website
yarn install
yarn build
yarn serve
```

To publish, select __GitHub Actions__ as the __Source__ under __Pages -> Build and deployment__ in the repository settings, and create the following DNS record (the served hostname is pinned by `website/static/CNAME`):

| Source Domain | Record Type | Target |
|---|---|---|
| nvidia-provider.stackql.io | CNAME | stackql.github.io. |

## License

MIT

## Contributing

Contributions are welcome. Please submit a Pull Request.
