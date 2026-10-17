--- 
title: deployment_gpu_specs
hide_title: false
hide_table_of_contents: false
keywords:
  - deployment_gpu_specs
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

Creates, updates, deletes, gets or lists a <code>deployment_gpu_specs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="deployment_gpu_specs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_deployments.deployment_gpu_specs" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


## Methods

The following methods are available for this resource:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Accessible by</th>
    <th>Required Params</th>
    <th>Optional Params</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a>, <a href="#parameter-gpu_spec_id"><code>gpu_spec_id</code></a></td>
    <td></td>
    <td> Updates the GPU specification of the specified function version's deployment.  It's important to note that GPU type and backend configurations cannot be  modified through this endpoint. If the specified function is public,  then Account Admin cannot perform this operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. </td>
</tr>
</tbody>
</table>

## Parameters

Parameters can be passed in the `WHERE` clause of a query. Check the [Methods](#methods) section to see which parameters are required or optional for each operation.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr id="parameter-deployment_id">
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Deployment id</td>
</tr>
<tr id="parameter-gpu_spec_id">
    <td><CopyableCode code="gpu_spec_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>GPU Specification id</td>
</tr>
</tbody>
</table>

## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

 Updates the GPU specification of the specified function version's deployment.  It's important to note that GPU type and backend configurations cannot be  modified through this endpoint. If the specified function is public,  then Account Admin cannot perform this operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. 

```sql
UPDATE nvidia.nvcf_deployments.deployment_gpu_specs
SET 
autoscaling_configuration = '{{ autoscaling_configuration }}',
autoscaling_configuration_policy = '{{ autoscaling_configuration_policy }}',
max_instances = {{ max_instances }},
min_instances = {{ min_instances }}
WHERE 
deployment_id = '{{ deployment_id }}' --required
AND gpu_spec_id = '{{ gpu_spec_id }}' --required
RETURNING
gpu_specification;
```
</TabItem>
</Tabs>
