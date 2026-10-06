--- 
title: artifact_deployments
hide_title: false
hide_table_of_contents: false
keywords:
  - artifact_deployments
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

Creates, updates, deletes, gets or lists an <code>artifact_deployments</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="artifact_deployments" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.artifact_deployments" /></td></tr>
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
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Create artifact version deployment url in team</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Create artifact version deployment url in org</td>
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
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Version ID</td>
</tr>
</tbody>
</table>

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

Create artifact version deployment url in team

```sql
INSERT INTO nvidia.private_registry.artifact_deployments (
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
version_id,
csp_name
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
'{{ version_id }}',
'{{ csp_name }}'
RETURNING
csp,
deployment_parameters,
deployment_url,
request_status
;
```
</TabItem>
<TabItem value="create">

Create artifact version deployment url in org

```sql
INSERT INTO nvidia.private_registry.artifact_deployments (
container,
cpu,
gpu,
memory,
model,
resource,
storage,
artifact_type,
artifact_name,
version_id,
csp_name
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
'{{ version_id }}',
'{{ csp_name }}'
RETURNING
csp,
deployment_parameters,
deployment_url,
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: artifact_deployments
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the artifact_deployments resource.
    - name: artifact_type
      value: "{{ artifact_type }}"
      description: Required parameter for the artifact_deployments resource.
    - name: artifact_name
      value: "{{ artifact_name }}"
      description: Required parameter for the artifact_deployments resource.
    - name: version_id
      value: "{{ version_id }}"
      description: Required parameter for the artifact_deployments resource.
    - name: csp_name
      value: "{{ csp_name }}"
      description: Required parameter for the artifact_deployments resource.
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
`}</CodeBlock>

</TabItem>
</Tabs>
