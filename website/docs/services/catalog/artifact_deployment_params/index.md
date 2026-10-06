--- 
title: artifact_deployment_params
hide_title: false
hide_table_of_contents: false
keywords:
  - artifact_deployment_params
  - catalog
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
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.artifact_deployment_params" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list_by_team', value: 'list_by_team' },
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
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>Get public artifact deployment parameters details in team</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>Get public artifact deployment parameters details in org</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>List public artifact deployment parameters in team</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-inherit_csp_parameters"><code>inherit_csp_parameters</code></a></td>
    <td>List public artifact deployment parameters in org</td>
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
<tr id="parameter-org_name">
    <td><CopyableCode code="org_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Organization name</td>
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
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

Get public artifact deployment parameters details in team

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
FROM nvidia.catalog.artifact_deployment_params
WHERE org_name = '{{ org_name }}' -- required
AND team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND csp_name = '{{ csp_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
<TabItem value="get">

Get public artifact deployment parameters details in org

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
FROM nvidia.catalog.artifact_deployment_params
WHERE org_name = '{{ org_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND csp_name = '{{ csp_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
<TabItem value="list_by_team">

List public artifact deployment parameters in team

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
FROM nvidia.catalog.artifact_deployment_params
WHERE org_name = '{{ org_name }}' -- required
AND team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
<TabItem value="list">

List public artifact deployment parameters in org

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
FROM nvidia.catalog.artifact_deployment_params
WHERE org_name = '{{ org_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND inherit_csp_parameters = '{{ inherit_csp_parameters }}'
;
```
</TabItem>
</Tabs>
