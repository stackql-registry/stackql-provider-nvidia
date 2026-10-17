# `nvidia` provider for [`stackql`](https://github.com/stackql/stackql)

This repository generates and documents the `nvidia` provider for StackQL, enabling SQL-based query and provisioning operations against the NVIDIA NGC control plane: NVIDIA Cloud Functions (NVCF - functions and versions, deployments and GPU specifications, cluster groups and GPU inventory, request queues, sharing grants, HTTP-polling invocation), the NGC private registry (models, resources, recipes, helm charts and other artifacts as metadata, collections, shares, encryption keys), the public NGC catalog, and NGC organizations, teams, users, roles and invitations. The provider is built using the `@stackql/provider-utils` package.

The build procedure is the bundled Claude Code skill, [`.claude/skills/stackql-provider-development`](.claude/skills/stackql-provider-development/SKILL.md); the settled decisions are in [AGENTS.md](AGENTS.md) and the findings with their evidence in [NOTES.md](NOTES.md).

## Positioning

NVIDIA publishes a Go Terraform provider, [`NVIDIA/terraform-provider-ngc`](https://github.com/NVIDIA/terraform-provider-ngc), covering NVCF functions and telemetry endpoints (one resource and one data source each); it reads `NGC_API_KEY`, `NGC_ORG` and `NGC_TEAM`, and this provider uses the same variables. The surface here is generated mechanically from the published NVCF OpenAPI document and the NGC API definitions behind the NGC API explorer: 335 operations across 7 services and 82 resources, plus the `vw_gpu_capacity` view, with response schemas for the registry taken from the `ngcsdk` Python SDK's data classes. The query surfaces that matter: GPU and cluster-group inventory, NVCF function fleet state by deployment specification, function sharing audits, registry and model estate reports, and org membership - the AI infrastructure control plane as data.

## Design Principles

- **Bearer auth with an NGC Personal API Key** - `Authorization: Bearer` with the key in `NGC_API_KEY` (`provider-dev/config/provider_config.json`). Keys need the Private Registry service scope for the registry service and, for NVCF, Cloud Functions at the organization level (NVIDIA's own docs warn that team-level roles break NVCF keys).
- **Org scope is a server variable** - registry and organization resources are scoped by `org_name`, resolved from `NGC_ORG` via `x-stackQL-envVar`; a `WHERE org_name` value always wins. NVCF paths carry no org (the key implies it).
- **Two hosts, one provider** - NVCF management, the registry, the catalog and organizations are served from `api.ngc.nvidia.com`; queue details and invocation from `api.nvcf.nvidia.com`, carried per service.
- **Deprecation-aware mapping** - NVIDIA's NGC deprecated API reference ends team-scoped (`/teams/{team}`) paths for NVCF and sibling services on 2026-09-30; those families are excluded by rule. Private Registry team scoping is exempt from that schedule and stays mapped as `*_by_team` methods on the same resources.
- **Registry resources are metadata** - artifact binary push/pull is the registry data plane and out of scope; streaming and gRPC invocation are not in the published spec, the HTTP-polling form is mapped.
- **snake_case surface** - columns, parameters and body attributes are snake_case aliases of the camelCase and kebab-case wire names.
- **Deterministic builds** - every step is a re-runnable `make` target; manual mapping decisions are rules in scripts, never hand-edits to derived artifacts; `all_services.csv` is committed as the durable record of every operation-to-method mapping.

Sibling-build findings are reused, not re-derived: supabase (the project-scope server template, offline validation and mock-server layers), k8s (mock-first CI, meta-route walk, snake_case aliases), clickhouse, godaddy, dockerhub, proxmox, vsphere, keycloak and vercel precedents are cited in [NOTES.md](NOTES.md).

## Prerequisites

- Node.js >= 22.19 and GNU make with bash (Linux, macOS or WSL)
- A `stackql` binary (`$STACKQL`, `./stackql`, or on `PATH`; `bin/start-server.sh` downloads one if none is found)
- Python 3 for the smoke suite (a venv with `pystackql` is created on demand); yarn for the docs microsite
- For live tests only: an NGC organization that is not a production one, with a Personal API Key in `NGC_API_KEY` and the organization name in `NGC_ORG` (see `.env.example`); the public catalog, the mock-backed integration suite and every other layer run without one

## Makefile

Every step is a `make` target (`make help` lists them). The composites:

```bash
make all      # deps, upstream drift check, full pipeline (pin check, clean, inventory, split, mappings,
              # pre-normalize, normalize, generate, post-process, views, GraphQL merge), offline +
              # integration + meta-route tests, docs generation, website build - no credentials needed
make upgrade  # the same chain, but ACCEPTING upstream changes (re-pins the inputs - review the diff)
make build    # the spec -> provider pipeline only (offline, from the committed pins)
make test     # the three credential-free test layers
make smoke    # live smoke suite against the test organization (sources .env if present)
```

`make all` never touches a real account. The live suites are `smoke`, `smoke-live` (the published provider, post-publish verification), `smoke-read-only`, `smoke-nvcf` (the gated NVCF deploy lifecycle, billable minutes) and `smoke-cleanup` (sweep `stackql-smoke-*` breadcrumbs). Under WSL keep the venv off the DrvFs mount: `make smoke VENV=$HOME/.venvs/stackql-nvidia`.

| Target | Purpose |
|---|---|
| `make deps` | install node dependencies |
| `make fetch-spec` / `make refresh-spec` | download the NVCF spec, harvest the NGC definitions and the ngcsdk schemas; verify against the pins / accept the change |
| `make pin-check` | verify the committed downloads against the pins (no network) |
| `make clean-specs` | deterministic spec repairs and swagger-parser validation |
| `make inventory` | classify every operation into `endpoint_inventory.csv` |
| `make split` | per-service specs on their hosts, org-scoped paths rebased |
| `make mappings` / `make mappings-report` | regenerate and validate `all_services.csv` / print every derived mapping without writing |
| `make pre-normalize normalize` | lower polymorphism in the service specs |
| `make generate` | generate the provider (runs `post-process` and `graphql-merge` automatically; views spliced) |
| `make test-offline test-integration test-meta` | the three credential-free test layers |
| `make start-server` / `stop-server` / `server-status` | a local stackql server over `provider-dev/openapi` (`PORT`, default 5444) |
| `make docs website` | generate the doc pages and build the microsite |

## 0. Acquire, pin and clean the upstream specs

```bash
make fetch-spec      # download the three inputs and verify against the recorded pins (fails on drift)
make refresh-spec    # accept an upstream change (rewrites the pins - review the diff)
make clean-specs     # deterministic repairs + swagger-parser validation, report in provider-dev/config/clean_report.json
```

Three pinned inputs (`provider-dev/config/spec_pin.json`: URL, date, sha256 of the canonical JSON; the downloads are committed since NVIDIA versions none of these URLs):

1. **NVCF** - the published OpenAPI spec served by the NVCF API itself (`https://api.nvcf.nvidia.com/v3/openapi`, linked from the NVCF API docs; openapi 3.1.0, version 2.261.2, 36 paths, 56 operations).
2. **NGC core** - `provider-dev/scripts/harvest_ngc_spec.mjs` downloads the definitions behind the NGC API explorer (`docs.ngc.nvidia.com/api/`) from their pinned URLs: the NGC API definition (orgs, teams, users - served by the public gateway at `api.ngc.nvidia.com/v3/api-docs`) and the Private Artifacts (Models) API (registry and catalog artifact metadata, from `models.ngc.nvidia.com`). The definitions that refuse public connections are recorded in `download_manifest.json`.
3. **ngcsdk** - the July 2026 models definition declared no 2xx response on 303 of its 333 operations. `harvest_ngc_sdk_schemas.mjs` downloads the `ngcsdk` wheel from PyPI (pinned version and sha256), converts its auto-generated data classes (`registry/data/model/*.py`) to JSON Schema, and the clean step attaches them as 200 responses to any operation that lacks one. The current definition ships responses on every operation, so the rule injects nothing today; it stays as the recorded fallback.

`clean_specs.mjs` applies deterministic repair rules with a per-source report: the relative server on the NGC definition, the `/v1` -> `/v2` public-gateway prefix on the models definition, snake_case path parameters throughout, path parameters whose declared name does not match their template token, cookie parameters (unsupported by the engine), query parameters with prose names, and the SDK response injection. It fails without writing on anything unfixable. Before accepting a refresh: `node .claude/skills/stackql-provider-development/scripts/spec_diff.mjs <pinned> <fetched>` and record the summary in `NOTES.md`.

## 1. Endpoint inventory and service split

```bash
make inventory
make split
```

`build_inventory.mjs` classifies every operation of the cleaned specs into `provider-dev/config/endpoint_inventory.csv` - host, org and team scoping, the org-scope rebase (`org_prefix`, `rebased_path`, `server_url`), declared auth and wire-observed public reads, pagination parameters, wire casing, response shape and objectKey candidate, the proposed service / resource / method / SQL verb, and a skip reason where applicable. The deprecation schedule is applied here as a rule (`SCHEDULED_DEPRECATIONS`). The CSV is the single source of truth every later step reads; it fails without writing on an unclassified operation, a duplicate method, a rebase collision, a service spanning two hosts, or a SELECT method without a projectable response.

The split assigns operations to services from the inventory, sets each service's root server (host) and title (`provider-dev/config/service_names.json`), and rebases org-scoped operations: the leading org prefix (`/v2/org/{org_name}`, `/v3/orgs/{org_name}`, `/v2/artifact-registry/org/{org_name}`) is removed from the path and the org path parameter dropped, to be re-attached as a server template in post-processing. Output: `provider-dev/source/<service>.yaml` (committed build artifacts).

495 operations inventoried, 335 mapped (select 157, insert 60, update 42, delete 48, replace 4, exec 24), 160 skipped with reason codes (service-infra 24, internal-admin 34, deprecated-inline 44, superseded-by-v3-twin 4, non-generator-http-verb 7, data-plane-file-transfer 22, non-json-response 4, non-projectable-response 2, legacy-twin 3, duplicate-endpoint-family 15, inbound-webhook-not-client-api 1), 82 resources across 7 services:

| Service | Resources | Contents |
|---|---|---|
| `orgs` | 11 | organizations, teams, users, team members and member roles, role grants, invitations, current user |
| `private_registry` | 30 | org-scoped artifact metadata: models, resources, recipes, generic artifacts (helm charts, endpoints, blueprints, agents, playbooks, APIs, skills), versions and files, collections, shares, deployment parameters, encryption keys, workflows; `*_by_team` twins |
| `catalog` | 21 | public artifact metadata reads plus the GPU and cloud service provider catalogs, NIM metadata publishing |
| `nvcf_functions` | 7 | functions, versions, function ids, metadata, authorizations (sharing grants), secrets, rate limits |
| `nvcf_deployments` | 7 (+ 1 view) | deployments and GPU specifications, cluster groups and GPUs, registry credentials, telemetries; `vw_gpu_capacity` |
| `nvcf_queues` | 2 | queue details, queue position |
| `nvcf_invocation` | 4 | HTTP-polling invocation (pexec + status), assets, assertion tokens |

## 2. Mappings

```bash
make mappings-report   # print every derived mapping without writing
make mappings          # regenerate all_services.csv from scratch and apply the inventory mappings
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

## 3. Normalize

```bash
make pre-normalize   # nvidia-specific passes in provider-dev/scripts/pre_normalize.mjs
make normalize       # provider-utils: allOf flatten, opaque objects, param lifting, bare-array wrap
```

`pre_normalize.mjs` lowers OpenAPI 3.1 constructs (type arrays, numeric exclusive bounds) and strips the models definition's per-operation `x-ssa-scopes` security hints. `normalize` (provider-utils) then flattens composition, converts opaque objects to JSON-blob strings, lifts path-item parameters onto operations and wraps bare-array responses (the GPU catalog).

## 4. Generate

```bash
make generate        # rm output, generate (bearer auth, snake_case aliases, naive bodies, views), post-process, GraphQL merge
```

Output: `provider-dev/openapi/src/nvidia/v00.00.00000/provider.yaml` + `services/*.yaml` (committed). No `--servers` or `--service-config` is passed: servers are per service (two hosts) and the org templates, casing and pagination are per method, all driven by the inventory in `post_process.mjs`, which applies as numbered rules:

- **Org server templates** - every rebased path item gets a path-level `servers` template (`https://api.ngc.nvidia.com/v2/org/{org_name}` and the v3 / artifact-registry forms) whose `org_name` variable carries `x-stackQL-envVar: NGC_ORG`. any-sdk resolves servers operation -> path item -> document, so the override applies to those operations only; it is applied after generation because normalize strips path-level servers.
- **Casing** - `request.nativeCasing: camel` (NVCF and JSON bodies) or `kebab` (methods with kebab query parameters such as `page-size`, `resolve-labels`) on every method, paired with `snake_case_aliases` on the provider.
- **Pagination and LIMIT pushdown** - NGC core collections page with zero-based `page-number` + `page-size` and echo `paginationInfo {index, totalPages}`; the `page_number` algorithm is configured per list method and `LIMIT n` is pushed to `page-size`.
- **Opaque bodies and scalar lists** - the pexec invocation body becomes a `{body}` wrapper with a request transform; `function_ids` and the invocation status body are re-shaped by response transforms.

Views in `views/<service>/views.yaml` are spliced by the generator (`vw_gpu_capacity` in `nvcf_deployments`: one row per cluster group x GPU x instance type); `provider-dev/source-graphql/` is present for the standard `make generate` shape but lists no operations (NVIDIA publishes no GraphQL API).

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

## 5. Test

```bash
make test-offline        # SHOW / DESCRIBE against the local file registry
make test-integration    # mock NGC + NVCF API, row-level and wire-level assertions
make test-meta           # meta-route walk over a local stackql server
make smoke               # live (needs .env)
```

[tests/offline_validation.mjs](tests/offline_validation.mjs) runs `SHOW SERVICES` / `SHOW RESOURCES` / `SHOW METHODS` / `DESCRIBE EXTENDED` against the local file registry and asserts the service and resource lists, verbs and required parameters, the `NGC_ORG` behaviour (`org_name` required only when unset), snake aliases, the transforms and the view - no network, no server.

[tests/integration/mock_nvidia_server.mjs](tests/integration/mock_nvidia_server.mjs) plays both hosts with real wire shapes (the `{<entities>, paginationInfo, requestStatus}` envelopes, the bare-array GPU catalog, the NVCF `{functions}` / `{function}` envelopes, the 202 + `NVCF-REQID` invocation) and enforces the bearer token. [run_integration_tests.mjs](tests/integration/run_integration_tests.mjs) materialises a test copy of the provider pointed at the mock (`harness.mjs`) and asserts row-level results and wire calls: envelope unwrapping, pagination over three pages and `LIMIT` pushdown, `NGC_ORG` resolution and override, the `*_by_team` routing, kebab and camel casing on the wire, a registry model lifecycle, the NVCF function / authorization / deployment lifecycles, queue details on the second host, the polling invocation, the view and a 404. `npm run probe -- "SELECT ..."` runs ad-hoc SQL against the mock and prints the wire calls.

The meta-route suite starts a StackQL wire server against the local registry and walks every service, resource and method, asserting that every resource has methods, that no two methods on the same SQL verb share a required-parameter signature, and that every selectable resource yields a non-empty `DESCRIBE EXTENDED`.

[tests/smoke_test.py](tests/smoke_test.py) (pystackql) runs against a real NGC organization, tiered by what the credentials can reach: the public catalog; organization and registry reads plus a free registry model `INSERT` / `UPDATE` / `DELETE` (the `UPDATE` string-coercion probe); NVCF reads (cluster groups and GPUs, fleet state) plus an undeployed function `INSERT` / version get / authorizations / `DELETE` where Cloud Functions is enabled (auto-detected, skipped with a notice otherwise). Everything it creates is named `stackql-smoke-<stamp>`, breadcrumbs are swept first, every statement is paced, and a `429` fails the run. Only the gated deploy lifecycle costs anything (the smallest instance type of the first cluster group, waited to `ACTIVE`, always torn down; well under $1):

```bash
make smoke                 # local provider (creates a pystackql venv on demand)
make smoke-live            # --live: the published provider in the stackql registry
make smoke-read-only       # reads only
make smoke-nvcf            # + the gated deploy lifecycle (billable minutes; needs NVCF_SMOKE_CONTAINER_IMAGE)
make smoke-cleanup         # just sweep breadcrumbs
```

Never run tests against a production organization. The live run still owed, and the result of the last attempt, are recorded in [NOTES.md](NOTES.md) (items 21, 21a, 21b).

## 6. Docs

```bash
make docs        # generate website/docs (snake_case surface, source project link) and sanitize for MDX
make website     # yarn install && yarn build (vendors the shared stackql/docusaurus-config)
make website-start
```

The doc microsite (`website/`) is Docusaurus 3.10 on the shared [`stackql/docusaurus-config`](https://github.com/stackql/docusaurus-config), vendored into `.shared-config/` at build time. Site-local files are the provider identity (`website/provider.js`), thin wrappers (`docusaurus.config.js`, which flips `showLastUpdateTime` on, and `sidebars.js`), the shared components under `src/`, and static assets including `static/CNAME`. `provider-dev/docgen/provider-data/headerContent1.txt` is the landing-page front matter and pitch; `headerContent2.txt` the getting-started page (installation, scope, authentication, organization scope, pagination and casing, rate limit, deprecations, example queries). `make docs` passes `--source-project $(SOURCE_PROJECT)`, which adds a `source project` row to the Provider Summary linking to this repository. Commit `website/docs` after every regeneration.

To publish the site, select GitHub Actions as the source under Pages -> Build and deployment in the repository settings (the deploy workflows build from `main` with `yarn install --frozen-lockfile`, cached on the committed `website/yarn.lock`) and create the DNS record (the served hostname is pinned by `website/static/CNAME`):

| Source domain | Record type | Target |
|---|---|---|
| `nvidia-provider.stackql.io` | CNAME | `stackql.github.io.` |

The provider is listed in the Providers menu of every StackQL site by adding it to `src/configs/providers.json` in the `stackql.io` repository.

## 7. Publish

Push the generated `provider-dev/openapi/src/nvidia` directory to `providers/src` in a feature branch of [stackql-provider-registry](https://github.com/stackql/stackql-provider-registry) and follow the [registry release flow](https://github.com/stackql/stackql-provider-registry/blob/dev/docs/build-and-deployment.md). Verify from the dev registry, then `make smoke-live`:

```bash
export DEV_REG='{ "url": "https://registry-dev.stackql.app/providers" }'
stackql --registry="${DEV_REG}" shell
```

```sql
REGISTRY PULL nvidia;
```

## 8. CI

[.github/workflows/build-and-test.yml](.github/workflows/build-and-test.yml): on push / PR - `npm ci`, `stackql/setup-stackql`, pin verification against upstream (warns on drift and restores the committed inputs), `make build`, a hard failure on uncommitted generation drift, the three credential-free test layers, docs generation; a live smoke job that is skipped at the job level on pull requests, on the schedule and until the `NGC_API_KEY` / `NGC_ORG` secrets are configured (never the deploy lifecycle); a weekly `upstream-drift` job that re-downloads every input, diffs it against the pins, snapshots the NGC deprecation schedule page and opens a labelled issue when anything moves. The web deploy workflows build the site from `main`.

## Authentication reference

`provider-dev/config/provider_config.json` becomes `config:` in `provider.yaml`:

```json
{"auth": {"type": "bearer", "credentialsenvvar": "NGC_API_KEY"}, "snake_case_aliases": true}
```

A user can override at runtime with `stackql --auth='{"nvidia": {"type": "bearer", "credentialsenvvar": "MY_OTHER_VAR"}}'`.

## Contributing

Contributions are welcome - rules in scripts, `make build && make test`, then a pull request.

## Security

Report vulnerabilities privately through the repository's advisory form, never in a public issue - see [SECURITY.md](SECURITY.md).

## License

MIT - see [LICENSE](LICENSE).
