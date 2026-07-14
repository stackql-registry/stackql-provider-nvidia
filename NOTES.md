# Engineering Notes

Phase 1 scope: spec acquisition (NVCF pin + NGC harvest), auth verification, endpoint inventory across both sources, mapping groundwork on three pilot services. Wire evidence is live against `api.ngc.nvidia.com` and `api.nvcf.nvidia.com` (2026-07-14, unauthenticated probes only - see Blocked). Spec pins in `provider-dev/config/spec_pin.json`: NVCF 2.245.1 (sha256 b79060bf...), ngc_kas v3.249.6 (dcaf78b0...), ngc_models 0.0.1-SNAPSHOT placeholder (7541d8f6...).

Sibling findings reused, not re-derived: dockerhub (public-read classification, `auth_declared` vs `observed_public_read` inventory columns, zero-setup docs lead), proxmox (EXEC returns request id + status SELECT, mock-first CI with secret-gated live smoke), vsphere (blocked-on-lab gating - harness exercised to its error paths when the live target is absent, offline phases proceed), keycloak (PUT is not REPLACE without field-drop evidence; numbered `## Open` list format).

## Resolved

1. **NVCF spec source - ANSWERED, live.** The OpenAPI Spec link on https://docs.nvidia.com/nvcf/api resolves to https://api.nvcf.nvidia.com/v3/openapi (served by the NVCF API itself; a companion Postman collection is referenced from the same documentation set). openapi 3.1.0, version 2.245.1, 35 paths / 54 operations. swagger-parser 12.1.0 validates it clean with no repairs.

2. **NGC harvest - ANSWERED, usable after cleaning.** The explorer at docs.ngc.nvidia.com/api/ is a swagger-ui over 11 displayed per-service definitions; the {url, name} list is extracted deterministically from its JS bundle. Publicly retrievable and in scope: `ngc_kas.json` ("NGC API Documentation" v3.249.6 - orgs, teams, users, invitations, 77 paths; the explorer labels it "KASv1 API (Deprecated)" but it is the only public orgs/users definition) and `ngc_models.json` ("Models API" - registry artifact metadata, 231 paths). Five in-scope definitions (Org Mgmt, User IAM, Search, Metadata, Publishing) resolve in DNS but refuse public connections - recorded in `download_manifest.json`. The "lacking a standard version field" flag materialized as: models carries a `0.0.1-SNAPSHOT` placeholder (noted, left as-is), kas declares a relative server `/` (repaired to `https://api.ngc.nvidia.com` by rule). The ngcsdk archetype-2 fallback is NOT invoked; decision and evidence in `spec_pin.json`.

3. **NVCF two-host split - ANSWERED from documentation.** The published spec declares a single server (`https://api.nvcf.nvidia.com`), but the NVCF documentation states the primary domain for function management is `api.ngc.nvidia.com` and the NVCF domain for function invocation and queue details is `api.nvcf.nvidia.com`. Both hosts return 401 (route exists) for `/v2/nvcf/functions` unauthenticated. Host is carried per operation group; per-operation assignment in `endpoint_inventory.csv`.

4. **Public-read hypothesis - CONFIRMED, wire-proven (the dockerhub precedent holds).** Unauthenticated (2026-07-14):
   - `GET /v2/search/catalog/resources/{type}?q={"query":"pytorch","pageSize":2}` -> 200 with full rows (`resultTotal: 22`). The `q` parameter is a JSON query object; a bare string is a 400.
   - `GET /v2/models/{org}/{name}` and `.../versions` -> 200 for public artifacts (`canGuestDownload: true` in the payload). Envelope `{"model": {...}, "requestStatus": {...}}`.
   - Org-scoped registry reads (`/v2/org/{org}/models/{name}`, and the models-host `/v1/org/...` originals) -> 401. `/v2/orgs`, `/v2/users/me`, `/v2/nvcf/*` -> 401.
   The zero-setup entry point for the docs is catalog search + guest artifact metadata.

5. **Gateway v1 -> v2 path rewrite - ANSWERED, wire-proven.** The harvested models spec declares `/v1/...` paths on `models.ngc.nvidia.com`; the public gateway serves the same operations at `api.ngc.nvidia.com/v2/...` (search responses echo `"instance": "/v1/search/..."` for `/v2/search/...` requests; `/v2/models/{org}/{name}` serves 200 where the spec path is `/v1/models/{org-name}/{name}`; the org-scoped twins 401 rather than 404 on both hosts/prefixes). Decision: the provider targets `api.ngc.nvidia.com` with the `/v1` -> `/v2` prefix rewrite applied at clean/pre-normalize time, so all NGC core operations ride one public host.

6. **Auth error envelopes - observed.** `api.ngc.nvidia.com` returns `{"requestStatus": {"statusCode": "UNAUTHORIZED", ...}}` with 401; `api.nvcf.nvidia.com` returns an empty 401 body. Useful for integration-test assertions.

## Blocked on key (the vsphere blocked-on-lab pattern)

7. **Live bearer verification - BLOCKED, no `NGC_API_KEY` in the environment** (process, user, and machine level checked). NGC Personal API Key generation is a console action (org > Setup > Generate Personal API Key) with service scopes: Private Registry, and Cloud Functions at the organization level - NVIDIA's docs warn team-level roles break NVCF keys. Key scopes are static. The legacy-key type exists (see item 8) but personal keys (`nvapi-...`) are the documented path. Owed once a key is present: a live `GET /v2/orgs` and `GET /v2/users/me` with `Authorization: Bearer $NGC_API_KEY`, the authenticated spec-endpoint probes (item 9), and the NVCF enablement check (item 10).

8. **Two key types, two auth flows - recorded, wire verification owed.** The explorer bundle's request interceptor exchanges a legacy NGC API key for a short-lived JWT via `https://authn.nvidia.com/token?scope=group/ngc&service=ngc` with `Authorization: Basic base64($oauthtoken:<key>)`. Personal API keys are documented to work directly as `Authorization: Bearer`. The provider auth config assumes the direct-bearer personal-key path; if any NGC core endpoint rejects direct bearer, the token exchange becomes a documented prerequisite (not a provider concern - StackQL carries the env var as-is).

9. **Authenticated spec endpoints - BLOCKED on key.** `api.ngc.nvidia.com/v3/openapi`, `/v3/search/api-docs`, `/v3/meta/api-docs` return 401 unauthenticated (the unreachable Search/Metadata definitions may be served authenticated through the gateway). Re-probe with the key; if the Search definition is retrievable it becomes the catalog-search spec source (see Open item 2).

10. **NVCF enablement of the test org - BLOCKED on key/org.** Recorded as unknown. The tiered smoke design (drafted): tier 1 catalog/public reads - no credentials, every CI run; tier 2 org/registry reads - free NGC account key; tier 3 NVCF - only where the org has Cloud Functions enabled, skip-with-notice otherwise (vsphere pattern); any deployed function uses the smallest instance spec, `stackql-smoke-<stamp>` naming, deleted within the run.

## Open

1. **Pagination idioms per resource** - to be recorded from the specs in the inventory (task 5) and confirmed live where access allows. `page`/`pageSize` observed on catalog search (`resultPageTotal` in the response); no assumption carried to other resources.
2. **Catalog search served but definition unreachable** - the public search surface (`/v2/search/catalog/...`) is wire-proven but the Search API definition is not publicly retrievable; blocked-on-key probe (item 9) or the operation stays out of v1 with a reason code if no definition materializes.
3. **Update semantics per resource** - PATCH vs PUT, partial vs full; label per the keycloak warning (no REPLACE without field-drop evidence). Owed in the inventory and phase 2 probes.
4. **Envelope/objectKey per resource** - `{model: ..., requestStatus: ...}` observed on model get; catalog search nests `results[].resources[]`. Systematic recording in the inventory from response schemas.
5. **openapi 3.1.0 handling** - nvcf and models sources are 3.1.0; the provider-utils split/normalize/generate chain is proven on 3.0.x (k8s). Any 3.1-specific breakage surfaces in the pilot (task 7) and is handled in pre_normalize as a deterministic downgrade of the affected constructs.
