--- 
title: deployments
hide_title: false
hide_table_of_contents: false
keywords:
  - deployments
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

Creates, updates, deletes, gets or lists a <code>deployments</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="deployments" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_deployments.deployments" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'get_by_id', value: 'get_by_id' }
    ]}
>
<TabItem value="get">

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
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Last deployment id (wire: deploymentId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function id (wire: functionId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id (wire: functionVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function name (wire: functionName)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Function deployment creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="deployment_specifications" /></td>
    <td><code>array</code></td>
    <td>Function deployment details (wire: deploymentSpecifications)</td>
</tr>
<tr>
    <td><CopyableCode code="function_status" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function status (ACTIVE, DEPLOYING, ERROR, INACTIVE, DELETED, DEGRADED, DEGRADING) (wire: functionStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="health_info" /></td>
    <td><code>array</code></td>
    <td>Health info for a deployment specification is included only if there are any  issues/errors.  (wire: healthInfo)</td>
</tr>
<tr>
    <td><CopyableCode code="last_updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Function deployment modification timestamp (wire: lastUpdatedAt)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="get_by_id">

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
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Last deployment id (wire: deploymentId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function id (wire: functionId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id (wire: functionVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function name (wire: functionName)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Function deployment creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="deployment_specifications" /></td>
    <td><code>array</code></td>
    <td>Function deployment details (wire: deploymentSpecifications)</td>
</tr>
<tr>
    <td><CopyableCode code="function_status" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function status (ACTIVE, DEPLOYING, ERROR, INACTIVE, DELETED, DEGRADED, DEGRADING) (wire: functionStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="health_info" /></td>
    <td><code>array</code></td>
    <td>Health info for a deployment specification is included only if there are any  issues/errors.  (wire: healthInfo)</td>
</tr>
<tr>
    <td><CopyableCode code="last_updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Function deployment modification timestamp (wire: lastUpdatedAt)</td>
</tr>
</tbody>
</table>
</TabItem>
</Tabs>

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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td></td>
    <td>Allows Account Admins to retrieve the deployment details of the specified  function version. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#get_by_id"><CopyableCode code="get_by_id" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
    <td></td>
    <td>Allows Account Admins to retrieve the deployment details of the specified  deployment id. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a>, <a href="#parameter-deployment_specifications"><code>deployment_specifications</code></a></td>
    <td></td>
    <td>Initiates deployment for the specified function version. Upon invocation of  this endpoint, the function's status transitions to 'DEPLOYING'. If the  specified function version is public, then Account Admin cannot perform this  operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a>, <a href="#parameter-deployment_specifications"><code>deployment_specifications</code></a></td>
    <td></td>
    <td> Deprecated and will be removed soon. Use a single GPU specification update  method instead.  Updates the deployment specs of the specified function version. It's important  to note that GPU type and backend configurations cannot be modified through  this endpoint. If the specified function is public, then Account Admin cannot  perform this operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td><a href="#parameter-graceful"><code>graceful</code></a></td>
    <td>Deletes the deployment associated with the specified function. Upon  deletion, any active instances will be terminated, and the function's status  will transition to 'INACTIVE'. To undeploy a function version gracefully,  specify 'graceful=true' query parameter, allowing current tasks to complete  before terminating the instances. If the specified function version is public,  then Account Admin cannot perform this operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. </td>
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
<tr id="parameter-function_id">
    <td><CopyableCode code="function_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function id</td>
</tr>
<tr id="parameter-function_version_id">
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id</td>
</tr>
<tr id="parameter-graceful">
    <td><CopyableCode code="graceful" /></td>
    <td><code>boolean</code></td>
    <td>Query param to deactivate function for graceful shutdown</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'get_by_id', value: 'get_by_id' }
    ]}
>
<TabItem value="get">

Allows Account Admins to retrieve the deployment details of the specified  function version. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. 

```sql
SELECT
deployment_id,
function_id,
function_version_id,
nca_id,
function_name,
created_at,
deployment_specifications,
function_status,
health_info,
last_updated_at
FROM nvidia.nvcf_deployments.deployments
WHERE function_id = '{{ function_id }}' -- required
AND function_version_id = '{{ function_version_id }}' -- required
;
```
</TabItem>
<TabItem value="get_by_id">

Allows Account Admins to retrieve the deployment details of the specified  deployment id. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. 

```sql
SELECT
deployment_id,
function_id,
function_version_id,
nca_id,
function_name,
created_at,
deployment_specifications,
function_status,
health_info,
last_updated_at
FROM nvidia.nvcf_deployments.deployments
WHERE deployment_id = '{{ deployment_id }}' -- required
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Initiates deployment for the specified function version. Upon invocation of  this endpoint, the function's status transitions to 'DEPLOYING'. If the  specified function version is public, then Account Admin cannot perform this  operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. 

```sql
INSERT INTO nvidia.nvcf_deployments.deployments (
deployment_specifications,
function_id,
function_version_id
)
SELECT 
'{{ deployment_specifications }}' /* required */,
'{{ function_id }}',
'{{ function_version_id }}'
RETURNING
deployment
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: deployments
  props:
    - name: function_id
      value: "{{ function_id }}"
      description: Required parameter for the deployments resource.
    - name: function_version_id
      value: "{{ function_version_id }}"
      description: Required parameter for the deployments resource.
    - name: deployment_specifications
      description: |
        GPU specs with GPU, instance_type, clusters etc. details
      value:
        - attributes: "{{ attributes }}"
          autoscalingConfiguration:
            scaleDownDetails:
              factor: {{ factor }}
              metric: "{{ metric }}"
              stickiness:
                size: "{{ size }}"
                threshold: "{{ threshold }}"
              threshold: {{ threshold }}
            scaleUpDetails:
              factor: {{ factor }}
              metric: "{{ metric }}"
              stickiness:
                size: "{{ size }}"
                threshold: "{{ threshold }}"
              threshold: {{ threshold }}
          availabilityZones: "{{ availabilityZones }}"
          backend: "{{ backend }}"
          clusters: "{{ clusters }}"
          configuration: "{{ configuration }}"
          cpuArch: "{{ cpuArch }}"
          driverVersion: "{{ driverVersion }}"
          gpu: "{{ gpu }}"
          gpuMemory: "{{ gpuMemory }}"
          gpuSpecificationId: "{{ gpuSpecificationId }}"
          helmValidationPolicy:
            extraKubernetesTypes:
              - group: "{{ group }}"
                kind: "{{ kind }}"
                version: "{{ version }}"
            name: "{{ name }}"
          instanceType: "{{ instanceType }}"
          maxInstances: {{ maxInstances }}
          maxRequestConcurrency: {{ maxRequestConcurrency }}
          minInstances: {{ minInstances }}
          os: "{{ os }}"
          regions: "{{ regions }}"
          storage: "{{ storage }}"
          systemMemory: "{{ systemMemory }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

 Deprecated and will be removed soon. Use a single GPU specification update  method instead.  Updates the deployment specs of the specified function version. It's important  to note that GPU type and backend configurations cannot be modified through  this endpoint. If the specified function is public, then Account Admin cannot  perform this operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. 

```sql
UPDATE nvidia.nvcf_deployments.deployments
SET 
deployment_specifications = '{{ deployment_specifications }}'
WHERE 
function_id = '{{ function_id }}' --required
AND function_version_id = '{{ function_version_id }}' --required
AND deployment_specifications = '{{ deployment_specifications }}' --required
RETURNING
deployment;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Deletes the deployment associated with the specified function. Upon  deletion, any active instances will be terminated, and the function's status  will transition to 'INACTIVE'. To undeploy a function version gracefully,  specify 'graceful=true' query parameter, allowing current tasks to complete  before terminating the instances. If the specified function version is public,  then Account Admin cannot perform this operation. Access to this endpoint mandates a bearer token with 'deploy_function' scope in the  HTTP Authorization header. 

```sql
DELETE FROM nvidia.nvcf_deployments.deployments
WHERE function_id = '{{ function_id }}' --required
AND function_version_id = '{{ function_version_id }}' --required
AND graceful = '{{ graceful }}'
;
```
</TabItem>
</Tabs>
