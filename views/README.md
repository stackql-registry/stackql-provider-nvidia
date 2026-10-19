# Provider views

Views are virtual, SELECT-only resources spliced into the generated provider at generate time from `views/<service>/views.yaml` (provider-utils reads `./views` automatically when the directory exists). They are documented like any other resource and tested in the offline layer with `DESCRIBE` / `SELECT * FROM nvidia.<service>.<view>`.

Good candidates: json_extract-heavy posture queries, multi-resource UNIONs, the provider's estate inventory. API-derived resources win on a name collision, so views are prefixed `vw_`.

A file is a top-level YAML mapping of view name -> resource body: `docs.fields` is what the doc page renders; `views.select.ddl` is what the engine runs, with the `sqlite3` form first and a `postgres` `fallback` for server mode. The engine learns a view's required parameters only from a `requiredParams == [...]` clause in the predicate; `docs.requiredParams` is docs-only.

Shipped here:

- `nvcf_deployments/views.yaml` - `vw_gpu_capacity`: one row per cluster group x GPU type x instance type, flattened from `cluster_groups` (the GPU estate the organization can deploy NVCF functions to).
