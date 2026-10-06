---
title: nvidia
hide_title: false
hide_table_of_contents: false
keywords:
  - nvidia
  - ngc
  - nvcf
  - nvidia cloud functions
  - ngc private registry
  - gpu inventory
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, provision and manage the NVIDIA NGC control plane using SQL - NVIDIA Cloud Functions (functions, versions, deployments, cluster groups and GPUs, sharing grants), the NGC private registry and public catalog (models, resources, helm charts, collections), and NGC organizations, teams and users
custom_edit_url: null
image: /img/stackql-nvidia-provider-featured-image.png
id: 'provider-intro'
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

Query, provision and operate the NVIDIA NGC control plane using SQL - NVIDIA Cloud Functions (NVCF: functions and versions, deployments and GPU specifications, cluster groups and GPU inventory, request queues, function sharing grants, HTTP-polling invocation), the NGC private registry (models, resources, recipes, helm charts and other artifacts as metadata, collections, shares, encryption keys), the public NGC catalog (artifact metadata, the GPU and cloud service provider catalogs - readable without an account) and NGC organizations, teams, users, roles and invitations. GPU capacity by cluster group, NVCF function fleet state by deployment specification, function sharing audits and registry estate reports are the queries this provider exists for.


:::info[Provider Summary] 

total services: __7__  
total resources: __83__  
source project: __[stackql-provider-nvidia](https://github.com/stackql-registry/stackql-provider-nvidia)__  

:::

See also:
[[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)
* * *

## Installation

To pull the latest version of the `nvidia` provider, run the following command:

```bash
REGISTRY PULL nvidia;
```
> To view previous provider versions or to pull a specific provider version, see [here](https://stackql.io/docs/language-spec/registry).

## Scope

This provider covers the NGC control plane served from `https://api.ngc.nvidia.com` and, for queue details and invocation, `https://api.nvcf.nvidia.com`: NVIDIA Cloud Functions management (`nvcf_functions`, `nvcf_deployments`, `nvcf_queues`, `nvcf_invocation`), the NGC private registry (`private_registry`), the public catalog (`catalog`) and organization administration (`orgs`). Registry artifacts are surfaced as metadata; binary push and pull of artifact files is the registry data plane and is not mapped. Streaming and gRPC function invocation are not mapped; the HTTP-polling form is. NVIDIA's official Terraform provider (`NVIDIA/terraform-provider-ngc`) covers NVCF functions and telemetry endpoints; the surface here is generated mechanically from the published NVCF OpenAPI document and the NGC API definitions behind the NGC API explorer (342 operations across 7 services and 83 resources), with response schemas for the registry taken from the `ngcsdk` Python SDK's data classes.

## Authentication

The provider authenticates with an NGC Personal API Key as a bearer token. Generate one in the NGC console under Setup -> Generate Personal API Key, granting the service scopes you need (Private Registry for the registry service; Cloud Functions for the `nvcf_*` services - at the organization level, since a key with a team-level Cloud Functions role does not work with NVCF), export it as <CopyableCode code="NGC_API_KEY" /> (the same variable the NVIDIA Terraform provider and the NGC CLI read), and StackQL picks it up with no further configuration:

```bash
export NGC_API_KEY='nvapi-...'
export NGC_ORG='0123456789ab'   # optional, see organization scope
```

or using PowerShell:

```powershell
$env:NGC_API_KEY = 'nvapi-...'
$env:NGC_ORG = '0123456789ab'
```

The public catalog (`nvidia.catalog`) serves public artifact metadata and the GPU catalog without any credential; the variable still has to be set for the provider to run, but any value works for those reads.

## Organization scope

Registry and organization resources are scoped to an NGC organization, addressed by its name (`org_name` - the org id shown under Organization -> Setup, for example `0123456789ab`). `org_name` is a server variable resolved from the <CopyableCode code="NGC_ORG" /> environment variable when it is set, so queries against one organization need no `WHERE org_name` clause:

```sql
SELECT name, display_name, framework, latest_version_id_str, updated_date
FROM nvidia.private_registry.models;
```

A `WHERE org_name = '...'` value always takes precedence over the environment, which is how a single session addresses several organizations. With the variable unset, `org_name` is a required parameter on every org-scoped method (visible in `SHOW METHODS`) and must be supplied per query. To discover the organizations the key can see:

```sql
SELECT name, display_name, type FROM nvidia.orgs.orgs;
```

Team-scoped registry paths are exposed as `*_by_team` methods on the same resources - add `team_name` to the `WHERE` clause and the team-scoped operation is selected:

```sql
SELECT name, updated_date
FROM nvidia.private_registry.models
WHERE team_name = 'ml-platform';
```

NVCF resources carry no organization in their paths: the key determines the organization.

## Pagination and casing

NGC core collections (organizations, users, teams, registry artifacts and versions) page with `page-number` and `page-size`; StackQL follows `paginationInfo.index` / `totalPages` transparently, so a `SELECT` returns every row, and `SELECT ... LIMIT n` is pushed to the wire as `page-size`. Columns are snake_case aliases of the camelCase wire properties (`displayName` -> `display_name`); query parameters are addressed in snake_case too (`resolve_labels`, `page_size`) and translated to the kebab-case wire names.

## Deprecations

NVIDIA's NGC deprecated API reference ends team-scoped (`/teams/{team}`) paths for NVCF and sibling services on 2026-09-30; those path families are excluded from the provider. Private Registry team scoping is exempt from that schedule and stays mapped (the `*_by_team` methods). Refreshes of the provider are reviewed spec diffs against content-hash pins.

## Example queries

### GPU capacity by cluster group

What GPU capacity exists, and where - the NVCF cluster groups the organization can deploy to, with their GPU types and instance types:

```sql
SELECT cg.name AS cluster_group,
       json_extract(g.value, '$.name') AS gpu,
       json_extract(g.value, '$.instanceTypes[0].name') AS instance_type,
       json_extract(cg.clusters, '$[0].name') AS cluster
FROM nvidia.nvcf_deployments.cluster_groups cg,
     json_each(cg.gpus) g
ORDER BY cluster_group, gpu;
```

### NVCF function fleet state

Every function version with its status, the container or helm chart it runs and its GPU deployment specification:

```sql
SELECT f.name, f.status, f.version_id,
       f.container_image, f.helm_chart,
       json_extract(d.deployment_specifications, '$[0].gpu') AS gpu,
       json_extract(d.deployment_specifications, '$[0].instanceType') AS instance_type,
       json_extract(d.deployment_specifications, '$[0].minInstances') AS min_instances,
       json_extract(d.deployment_specifications, '$[0].maxInstances') AS max_instances
FROM nvidia.nvcf_functions.functions f
LEFT JOIN nvidia.nvcf_deployments.deployments d
  ON d.function_id = f.id AND d.function_version_id = f.version_id
WHERE f.status = 'ACTIVE';
```

Deployed functions with more than one minimum instance - the standing GPU spend:

```sql
SELECT function_name, function_status,
       json_extract(deployment_specifications, '$[0].gpu') AS gpu,
       json_extract(deployment_specifications, '$[0].minInstances') AS min_instances
FROM nvidia.nvcf_deployments.deployments
WHERE function_id = 'fe97aa46-c8ea-4237-ba56-1212036f4d0f'
  AND function_version_id = '868d2192-6819-4b53-89f5-3c7fb1df2a72';
```

### Function sharing audit

Which NVIDIA Cloud Accounts may invoke a function - the authorization grants as data:

```sql
SELECT id AS function_id, version_id, nca_id AS owner,
       json_extract(authorized_parties, '$[*].ncaId') AS authorized_accounts
FROM nvidia.nvcf_functions.authorizations
WHERE function_id = 'fe97aa46-c8ea-4237-ba56-1212036f4d0f';
```

### Registry estate report

Models in the private registry by framework, with size and update recency (with `NGC_ORG` set):

```sql
SELECT name, framework, precision,
       latest_version_id_str AS latest_version,
       latest_version_size_in_bytes / 1048576 AS latest_version_mb,
       updated_date
FROM nvidia.private_registry.models
ORDER BY updated_date DESC;
```

Helm charts, endpoints, blueprints, agents, playbooks, APIs and skills through the generic artifacts resource (`artifact_type` takes the plural path segment: `helm-charts`, `endpoints`, `agents`, `blueprints`, `apis`, `playbooks`, `skills`; models, resources and recipes have their own resources; container images are served by the separate container registry API and are not in this provider):

```sql
SELECT name, display_name, latest_version_id_str, updated_date
FROM nvidia.private_registry.artifacts
WHERE artifact_type = 'helm-charts';
```

### Public catalog, no account needed

```sql
SELECT name, org_name, display_name, framework
FROM nvidia.catalog.models
LIMIT 20;

SELECT display_name, pci_device_id, memory_size_gb, form_factor
FROM nvidia.catalog.gpus;
```

### Organization membership

Users in the organization with their roles:

```sql
SELECT email, name, is_active, last_login_date,
       json_extract(roles, '$[0].orgRoles') AS org_roles
FROM nvidia.orgs.users;
```

### Provisioning

Mutations use the same SQL grammar - `INSERT` creates, `UPDATE` patches, `DELETE` removes, and lifecycle actions are `EXEC` methods. Body columns are the snake_case spellings of the wire properties. A function with a first version, its deployment on the smallest instance, and the teardown:

```sql
-- create the function (and its first version)
INSERT INTO nvidia.nvcf_functions.functions (name, inference_url, container_image, api_body_format)
SELECT 'echo-demo', '/echo', 'nvcr.io/0123456789ab/echo:latest', 'CUSTOM';

-- deploy the version (the specification is a JSON array of {gpu, backend, instanceType, minInstances, maxInstances})
INSERT INTO nvidia.nvcf_deployments.deployments (function_id, function_version_id, deployment_specifications)
SELECT 'fe97aa46-...', '868d2192-...',
       '[{"gpu": "L40", "backend": "GFN", "instanceType": "GCP.GPU.L40_1x", "minInstances": 1, "maxInstances": 1}]';

-- share it with another NVIDIA Cloud Account
INSERT INTO nvidia.nvcf_functions.authorizations (function_id, authorized_party)
SELECT 'fe97aa46-...', '{"ncaId": "nca-partner-id"}';

-- undeploy, then delete the version
DELETE FROM nvidia.nvcf_deployments.deployments
WHERE function_id = 'fe97aa46-...' AND function_version_id = '868d2192-...';

DELETE FROM nvidia.nvcf_functions.function_versions
WHERE function_id = 'fe97aa46-...' AND function_version_id = '868d2192-...';
```

Invoke a function through the HTTP-polling form and read the result:

```sql
EXEC nvidia.nvcf_invocation.invocations.invoke
  @function_id = 'fe97aa46-...',
  @body = '{"prompt": "hello"}';

SELECT response
FROM nvidia.nvcf_invocation.invocation_status
WHERE request_id = '<NVCF-REQID from the invoke>';
```

Registry metadata is provisioned the same way:

```sql
INSERT INTO nvidia.private_registry.models (name, display_name, framework, precision, application, short_description)
SELECT 'resnet50-finetuned', 'ResNet-50 fine-tuned', 'PyTorch', 'FP16', 'Classification', 'fine-tuned on internal data';

UPDATE nvidia.private_registry.models
SET display_name = 'ResNet-50 fine-tuned v2'
WHERE model_name = 'resnet50-finetuned';

DELETE FROM nvidia.private_registry.models
WHERE model_name = 'resnet50-finetuned';
```

### The whole GPU estate in one statement

NVCF cluster-group GPU types alongside the hyperscaler GPU instance inventory, using the `aws`, `google` and `azure` providers:

```sql
SELECT 'nvcf' AS platform, cg.name AS location, json_extract(g.value, '$.name') AS gpu
FROM nvidia.nvcf_deployments.cluster_groups cg, json_each(cg.gpus) g
UNION ALL
SELECT 'aws', region, json_extract(gpu_info, '$.Gpus[0].Name')
FROM aws.ec2.instance_types
WHERE region = 'us-east-1' AND gpu_info IS NOT NULL
UNION ALL
SELECT 'google', json_extract(zone, '$'), json_extract(accelerators, '$[0].guestAcceleratorType')
FROM google.compute.machine_types
WHERE project = 'my-project' AND zone = 'us-central1-a' AND accelerators IS NOT NULL;
```


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/catalog/">catalog</a><br />
<a href="/services/nvcf_deployments/">nvcf_deployments</a><br />
<a href="/services/nvcf_functions/">nvcf_functions</a><br />
<a href="/services/nvcf_invocation/">nvcf_invocation</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/nvcf_queues/">nvcf_queues</a><br />
<a href="/services/orgs/">orgs</a><br />
<a href="/services/private_registry/">private_registry</a><br />
</div>
</div>
