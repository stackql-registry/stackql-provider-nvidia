--- 
title: vw_gpu_capacity
hide_title: false
hide_table_of_contents: false
keywords:
  - vw_gpu_capacity
  - nvcf_deployments
  - nvidia
  - infrastructure_as_code
  - configuration_as_data
  - cloud inventory
description: Query, deploy and manage nvidia resources using SQL
custom_edit_url: null
image: /img/stackql-nvidia-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>vw_gpu_capacity</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="vw_gpu_capacity" /></td></tr>
<tr><td><b>Type</b></td><td>View</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_deployments.vw_gpu_capacity" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by this view:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="cluster_group" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Cluster group name (the backend named in a deployment specification).</td>
</tr>
<tr>
    <td><CopyableCode code="cluster_group_id" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Cluster group id.</td>
</tr>
<tr>
    <td><CopyableCode code="gpu" /></td>
    <td><CopyableCode code="string" /></td>
    <td>GPU type available in the cluster group (for example L40</td>
</tr>
<tr>
    <td><CopyableCode code="instance_type" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Instance type name for the GPU (the instanceType of a deployment specification).</td>
</tr>
<tr>
    <td><CopyableCode code="instance_description" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Vendor description of the instance type.</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><CopyableCode code="boolean" /></td>
    <td>Whether the instance type is the default for the GPU.</td>
</tr>
<tr>
    <td><CopyableCode code="cluster" /></td>
    <td><CopyableCode code="string" /></td>
    <td>Name of the first cluster in the group.</td>
</tr>
<tr>
    <td><CopyableCode code="nca_id" /></td>
    <td><CopyableCode code="string" /></td>
    <td>NVIDIA Cloud Account that owns the cluster group.</td>
</tr>
</tbody>
</table>

## `SELECT` Examples

```sql
SELECT
  cluster_group,
  cluster_group_id,
  gpu,
  instance_type,
  instance_description,
  is_default,
  cluster,
  nca_id
FROM nvidia.nvcf_deployments.vw_gpu_capacity;
```

## SQL Definition

<Tabs
defaultValue="Sqlite3"
values={[
{ label: 'Sqlite3', value: 'Sqlite3' },
{ label: 'Postgres', value: 'Postgres' }
]}
>
<TabItem value="Sqlite3">

```sql
SELECT cg.name AS cluster_group,
       cg.id AS cluster_group_id,
       json_extract(g.value, '$.name') AS gpu,
       json_extract(it.value, '$.name') AS instance_type,
       json_extract(it.value, '$.description') AS instance_description,
       json_extract(it.value, '$.default') AS is_default,
       json_extract(cg.clusters, '$[0].name') AS cluster,
       cg.nca_id
FROM nvidia.nvcf_deployments.cluster_groups cg,
     json_each(cg.gpus) g,
     json_each(json_extract(g.value, '$.instanceTypes')) it
```

</TabItem>
<TabItem value="Postgres">

```sql
SELECT cg.name AS cluster_group,
       cg.id AS cluster_group_id,
       g.value->>'name' AS gpu,
       it.value->>'name' AS instance_type,
       it.value->>'description' AS instance_description,
       (it.value->>'default')::boolean AS is_default,
       cg.clusters::jsonb->0->>'name' AS cluster,
       cg.nca_id
FROM nvidia.nvcf_deployments.cluster_groups cg,
     jsonb_array_elements(cg.gpus::jsonb) AS g(value),
     jsonb_array_elements(g.value->'instanceTypes') AS it(value)
```

</TabItem>
</Tabs>
