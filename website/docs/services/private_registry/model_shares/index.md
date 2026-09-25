--- 
title: model_shares
hide_title: false
hide_table_of_contents: false
keywords:
  - model_shares
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

Creates, updates, deletes, gets or lists a <code>model_shares</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="model_shares" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.model_shares" /></td></tr>
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
    <td><a href="#add_team_by_team"><CopyableCode code="add_team_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-target_team"><code>target_team</code></a></td>
    <td></td>
    <td>This operation shares a team model with the team.</td>
</tr>
<tr>
    <td><a href="#add_team"><CopyableCode code="add_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-target_team"><code>target_team</code></a></td>
    <td></td>
    <td>This operation shares an org model with the team.</td>
</tr>
<tr>
    <td><a href="#add_org_by_team"><CopyableCode code="add_org_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>This operation shares a team model with the org.</td>
</tr>
<tr>
    <td><a href="#add_org"><CopyableCode code="add_org" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>This operation shares an org model with the org.</td>
</tr>
<tr>
    <td><a href="#remove_team_by_team"><CopyableCode code="remove_team_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-target_team"><code>target_team</code></a></td>
    <td></td>
    <td>This operation revokes a shared team model with the team.</td>
</tr>
<tr>
    <td><a href="#remove_team"><CopyableCode code="remove_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-target_team"><code>target_team</code></a></td>
    <td></td>
    <td>This operation revokes a shared org model with the team.</td>
</tr>
<tr>
    <td><a href="#remove_org_by_team"><CopyableCode code="remove_org_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>This operation revokes a shared team model with the org.</td>
</tr>
<tr>
    <td><a href="#remove_org"><CopyableCode code="remove_org" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>This operation revokes a shared org model with the org.</td>
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
<tr id="parameter-model_name">
    <td><CopyableCode code="model_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Model name</td>
</tr>
<tr id="parameter-target_team">
    <td><CopyableCode code="target_team" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Target team name</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="add_team_by_team"
    values={[
        { label: 'add_team_by_team', value: 'add_team_by_team' },
        { label: 'add_team', value: 'add_team' },
        { label: 'add_org_by_team', value: 'add_org_by_team' },
        { label: 'add_org', value: 'add_org' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add_team_by_team">

This operation shares a team model with the team.

```sql
INSERT INTO nvidia.private_registry.model_shares (
team_name,
model_name,
target_team
)
SELECT 
'{{ team_name }}',
'{{ model_name }}',
'{{ target_team }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add_team">

This operation shares an org model with the team.

```sql
INSERT INTO nvidia.private_registry.model_shares (
model_name,
target_team
)
SELECT 
'{{ model_name }}',
'{{ target_team }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add_org_by_team">

This operation shares a team model with the org.

```sql
INSERT INTO nvidia.private_registry.model_shares (
team_name,
model_name
)
SELECT 
'{{ team_name }}',
'{{ model_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add_org">

This operation shares an org model with the org.

```sql
INSERT INTO nvidia.private_registry.model_shares (
model_name
)
SELECT 
'{{ model_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: model_shares
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the model_shares resource.
    - name: model_name
      value: "{{ model_name }}"
      description: Required parameter for the model_shares resource.
    - name: target_team
      value: "{{ target_team }}"
      description: Required parameter for the model_shares resource.
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="remove_team_by_team"
    values={[
        { label: 'remove_team_by_team', value: 'remove_team_by_team' },
        { label: 'remove_team', value: 'remove_team' },
        { label: 'remove_org_by_team', value: 'remove_org_by_team' },
        { label: 'remove_org', value: 'remove_org' }
    ]}
>
<TabItem value="remove_team_by_team">

This operation revokes a shared team model with the team.

```sql
DELETE FROM nvidia.private_registry.model_shares
WHERE team_name = '{{ team_name }}' --required
AND model_name = '{{ model_name }}' --required
AND target_team = '{{ target_team }}' --required
;
```
</TabItem>
<TabItem value="remove_team">

This operation revokes a shared org model with the team.

```sql
DELETE FROM nvidia.private_registry.model_shares
WHERE model_name = '{{ model_name }}' --required
AND target_team = '{{ target_team }}' --required
;
```
</TabItem>
<TabItem value="remove_org_by_team">

This operation revokes a shared team model with the org.

```sql
DELETE FROM nvidia.private_registry.model_shares
WHERE team_name = '{{ team_name }}' --required
AND model_name = '{{ model_name }}' --required
;
```
</TabItem>
<TabItem value="remove_org">

This operation revokes a shared org model with the org.

```sql
DELETE FROM nvidia.private_registry.model_shares
WHERE model_name = '{{ model_name }}' --required
;
```
</TabItem>
</Tabs>
