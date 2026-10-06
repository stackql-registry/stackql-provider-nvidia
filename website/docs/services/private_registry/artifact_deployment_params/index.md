--- 
title: artifact_deployment_params
hide_title: false
hide_table_of_contents: false
keywords:
  - artifact_deployment_params
  - private_registry
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

Creates, updates, deletes, gets or lists an <code>artifact_deployment_params</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="artifact_deployment_params" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.artifact_deployment_params" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

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
    <td><CopyableCode code="container" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="cpu" /></td>
    <td><code>object</code></td>
    <td>Deployment CPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="csp" /></td>
    <td><code>string</code></td>
    <td>Cloud Service Provider name</td>
</tr>
<tr>
    <td><CopyableCode code="gpu" /></td>
    <td><code>object</code></td>
    <td>Deployment GPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="memory" /></td>
    <td><code>object</code></td>
    <td>Deployment Memory Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="resource" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="storage" /></td>
    <td><code>object</code></td>
    <td>Deployment Storage Parameters object</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_team">

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
    <td><CopyableCode code="container" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="cpu" /></td>
    <td><code>object</code></td>
    <td>Deployment CPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="csp" /></td>
    <td><code>string</code></td>
    <td>Cloud Service Provider name</td>
</tr>
<tr>
    <td><CopyableCode code="gpu" /></td>
    <td><code>object</code></td>
    <td>Deployment GPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="memory" /></td>
    <td><code>object</code></td>
    <td>Deployment Memory Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="resource" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="storage" /></td>
    <td><code>object</code></td>
    <td>Deployment Storage Parameters object</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="container" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="cpu" /></td>
    <td><code>object</code></td>
    <td>Deployment CPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="csp" /></td>
    <td><code>string</code></td>
    <td>Cloud Service Provider name</td>
</tr>
<tr>
    <td><CopyableCode code="gpu" /></td>
    <td><code>object</code></td>
    <td>Deployment GPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="memory" /></td>
    <td><code>object</code></td>
    <td>Deployment Memory Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="resource" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="storage" /></td>
    <td><code>object</code></td>
    <td>Deployment Storage Parameters object</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

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
    <td><CopyableCode code="container" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="cpu" /></td>
    <td><code>object</code></td>
    <td>Deployment CPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="csp" /></td>
    <td><code>string</code></td>
    <td>Cloud Service Provider name</td>
</tr>
<tr>
    <td><CopyableCode code="gpu" /></td>
    <td><code>object</code></td>
    <td>Deployment GPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="memory" /></td>
    <td><code>object</code></td>
    <td>Deployment Memory Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="resource" /></td>
    <td><code>object</code></td>
    <td>Deployment Artifact Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="storage" /></td>
    <td><code>object</code></td>
    <td>Deployment Storage Parameters object</td>
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
    <td><a href="#get_by_team"><CopyableCode code="get_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>Get artifact deployment parameters details in team</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>List artifact deployment parameters in team</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>Get artifact deployment parameters details in org</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>List artifact deployment parameters in org</td>
</tr>
<tr>
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-no_auto_labels"><code>no_auto_labels</code></a>, <a href="#parameter-merge_csp_parameters"><code>merge_csp_parameters</code></a></td>
    <td>Create artifact deployment parameters in team</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-no_auto_labels"><code>no_auto_labels</code></a>, <a href="#parameter-merge_csp_parameters"><code>merge_csp_parameters</code></a></td>
    <td>Create artifact deployment parameters in org</td>
</tr>
<tr>
    <td><a href="#update_by_team"><CopyableCode code="update_by_team" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-merge_csp_parameters"><code>merge_csp_parameters</code></a></td>
    <td>Update artifact deployment parameters in team</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-merge_csp_parameters"><code>merge_csp_parameters</code></a></td>
    <td>Update artifact deployment parameters in org</td>
</tr>
<tr>
    <td><a href="#delete_by_team"><CopyableCode code="delete_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Delete artifact deployment parameters in team</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Delete artifact deployment parameters in org</td>
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
<tr id="parameter-artifact_name">
    <td><CopyableCode code="artifact_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact name</td>
</tr>
<tr id="parameter-artifact_type">
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact type</td>
</tr>
<tr id="parameter-csp_name">
    <td><CopyableCode code="csp_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Cloud service provider name</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
<tr id="parameter-inherit_csp_parameters">
    <td><CopyableCode code="inherit_csp_parameters" /></td>
    <td><code>boolean</code></td>
    <td>Inherit CSP parameters</td>
</tr>
<tr id="parameter-merge_csp_parameters">
    <td><CopyableCode code="merge_csp_parameters" /></td>
    <td><code>boolean</code></td>
    <td>Merge CSP parameters in response</td>
</tr>
<tr id="parameter-no_auto_labels">
    <td><CopyableCode code="no_auto_labels" /></td>
    <td><code>boolean</code></td>
    <td>No auto labels</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

Get artifact deployment parameters details in team

```sql
SELECT
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage
FROM nvidia.private_registry.artifact_deployment_params
WHERE team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND csp_name = '{{ csp_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
<TabItem value="list_by_team">

List artifact deployment parameters in team

```sql
SELECT
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage
FROM nvidia.private_registry.artifact_deployment_params
WHERE team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
<TabItem value="get">

Get artifact deployment parameters details in org

```sql
SELECT
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage
FROM nvidia.private_registry.artifact_deployment_params
WHERE artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND csp_name = '{{ csp_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
<TabItem value="list">

List artifact deployment parameters in org

```sql
SELECT
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage
FROM nvidia.private_registry.artifact_deployment_params
WHERE artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create_by_team"
    values={[
        { label: 'create_by_team', value: 'create_by_team' },
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create_by_team">

Create artifact deployment parameters in team

```sql
INSERT INTO nvidia.private_registry.artifact_deployment_params (
container,
cpu,
gpu,
memory,
model,
resource,
storage,
team_name,
artifact_type,
artifact_name,
csp_name,
no_auto_labels,
merge_csp_parameters
)
SELECT 
'{{ container }}',
'{{ cpu }}',
'{{ gpu }}',
'{{ memory }}',
'{{ model }}',
'{{ resource }}',
'{{ storage }}',
'{{ team_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}',
'{{ csp_name }}',
'{{ no_auto_labels }}',
'{{ merge_csp_parameters }}'
RETURNING
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage
;
```
</TabItem>
<TabItem value="create">

Create artifact deployment parameters in org

```sql
INSERT INTO nvidia.private_registry.artifact_deployment_params (
container,
cpu,
gpu,
memory,
model,
resource,
storage,
artifact_type,
artifact_name,
csp_name,
no_auto_labels,
merge_csp_parameters
)
SELECT 
'{{ container }}',
'{{ cpu }}',
'{{ gpu }}',
'{{ memory }}',
'{{ model }}',
'{{ resource }}',
'{{ storage }}',
'{{ artifact_type }}',
'{{ artifact_name }}',
'{{ csp_name }}',
'{{ no_auto_labels }}',
'{{ merge_csp_parameters }}'
RETURNING
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: artifact_deployment_params
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the artifact_deployment_params resource.
    - name: artifact_type
      value: "{{ artifact_type }}"
      description: Required parameter for the artifact_deployment_params resource.
    - name: artifact_name
      value: "{{ artifact_name }}"
      description: Required parameter for the artifact_deployment_params resource.
    - name: csp_name
      value: "{{ csp_name }}"
      description: Required parameter for the artifact_deployment_params resource.
    - name: container
      description: |
        Deployment Artifact Parameters object
      value:
        artifactType: "{{ artifactType }}"
        displayName: "{{ displayName }}"
        filePath: "{{ filePath }}"
        name: "{{ name }}"
        orgName: "{{ orgName }}"
        teamName: "{{ teamName }}"
        versionId: "{{ versionId }}"
    - name: cpu
      description: |
        Deployment CPU Parameters object
      value:
        count: {{ count }}
    - name: gpu
      description: |
        Deployment GPU Parameters object
      value:
        count: {{ count }}
        type: "{{ type }}"
    - name: memory
      description: |
        Deployment Memory Parameters object
      value:
        capacityInGB: {{ capacityInGB }}
    - name: model
      description: |
        Deployment Artifact Parameters object
      value:
        artifactType: "{{ artifactType }}"
        displayName: "{{ displayName }}"
        filePath: "{{ filePath }}"
        name: "{{ name }}"
        orgName: "{{ orgName }}"
        teamName: "{{ teamName }}"
        versionId: "{{ versionId }}"
    - name: resource
      description: |
        Deployment Artifact Parameters object
      value:
        artifactType: "{{ artifactType }}"
        displayName: "{{ displayName }}"
        filePath: "{{ filePath }}"
        name: "{{ name }}"
        orgName: "{{ orgName }}"
        teamName: "{{ teamName }}"
        versionId: "{{ versionId }}"
    - name: storage
      description: |
        Deployment Storage Parameters object
      value:
        capacityInGB: {{ capacityInGB }}
    - name: no_auto_labels
      value: {{ no_auto_labels }}
      description: No auto labels
      description: No auto labels
    - name: merge_csp_parameters
      value: {{ merge_csp_parameters }}
      description: Merge CSP parameters in response
      description: Merge CSP parameters in response
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update_by_team"
    values={[
        { label: 'update_by_team', value: 'update_by_team' },
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update_by_team">

Update artifact deployment parameters in team

```sql
UPDATE nvidia.private_registry.artifact_deployment_params
SET 
container = '{{ container }}',
cpu = '{{ cpu }}',
gpu = '{{ gpu }}',
memory = '{{ memory }}',
model = '{{ model }}',
resource = '{{ resource }}',
storage = '{{ storage }}'
WHERE 
team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
AND csp_name = '{{ csp_name }}' --required
AND merge-csp-parameters = {{ merge-csp-parameters}}
RETURNING
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage;
```
</TabItem>
<TabItem value="update">

Update artifact deployment parameters in org

```sql
UPDATE nvidia.private_registry.artifact_deployment_params
SET 
container = '{{ container }}',
cpu = '{{ cpu }}',
gpu = '{{ gpu }}',
memory = '{{ memory }}',
model = '{{ model }}',
resource = '{{ resource }}',
storage = '{{ storage }}'
WHERE 
artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
AND csp_name = '{{ csp_name }}' --required
AND merge-csp-parameters = {{ merge-csp-parameters}}
RETURNING
container,
cpu,
csp,
gpu,
memory,
model,
resource,
storage;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete_by_team"
    values={[
        { label: 'delete_by_team', value: 'delete_by_team' },
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete_by_team">

Delete artifact deployment parameters in team

```sql
DELETE FROM nvidia.private_registry.artifact_deployment_params
WHERE team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
AND csp_name = '{{ csp_name }}' --required
;
```
</TabItem>
<TabItem value="delete">

Delete artifact deployment parameters in org

```sql
DELETE FROM nvidia.private_registry.artifact_deployment_params
WHERE artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
AND csp_name = '{{ csp_name }}' --required
;
```
</TabItem>
</Tabs>
