--- 
title: teams
hide_title: false
hide_table_of_contents: false
keywords:
  - teams
  - orgs
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

Creates, updates, deletes, gets or lists a <code>teams</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="teams" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.orgs.teams" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>unique Id of this team.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>team name</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>description of the team</td>
</tr>
<tr>
    <td><CopyableCode code="infinity_manager_settings" /></td>
    <td><code>object</code></td>
    <td>Infinity manager setting definition (wire: infinityManagerSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="is_deleted" /></td>
    <td><code>boolean</code></td>
    <td>indicates if the team is deleted or not (wire: isDeleted)</td>
</tr>
<tr>
    <td><CopyableCode code="repo_scan_settings" /></td>
    <td><code>object</code></td>
    <td>Repo scan setting definition (wire: repoScanSettings)</td>
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>unique Id of this team.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>team name</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>description of the team</td>
</tr>
<tr>
    <td><CopyableCode code="infinity_manager_settings" /></td>
    <td><code>object</code></td>
    <td>Infinity manager setting definition (wire: infinityManagerSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="is_deleted" /></td>
    <td><code>boolean</code></td>
    <td>indicates if the team is deleted or not (wire: isDeleted)</td>
</tr>
<tr>
    <td><CopyableCode code="repo_scan_settings" /></td>
    <td><code>object</code></td>
    <td>Repo scan setting definition (wire: repoScanSettings)</td>
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
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td></td>
    <td>Get Team by name</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-page_size"><code>page_size</code></a></td>
    <td>List all Teams</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Create team in org. (Org Admin Privileges Required)</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td></td>
    <td>Edit a Team</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td></td>
    <td>Delete a Team</td>
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
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-page_number">
    <td><CopyableCode code="page_number" /></td>
    <td><code>integer (int32)</code></td>
    <td>The page number of result</td>
</tr>
<tr id="parameter-page_size">
    <td><CopyableCode code="page_size" /></td>
    <td><code>integer (int32)</code></td>
    <td>The page size of result</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Get Team by name

```sql
SELECT
id,
name,
description,
infinity_manager_settings,
is_deleted,
repo_scan_settings
FROM nvidia.orgs.teams
WHERE team_name = '{{ team_name }}' -- required
;
```
</TabItem>
<TabItem value="list">

List all Teams

```sql
SELECT
id,
name,
description,
infinity_manager_settings,
is_deleted,
repo_scan_settings
FROM nvidia.orgs.teams
WHERE page_number = '{{ page_number }}'
AND page_size = '{{ page_size }}'
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

Create team in org. (Org Admin Privileges Required)

```sql
INSERT INTO nvidia.orgs.teams (
description,
name
)
SELECT 
'{{ description }}',
'{{ name }}' /* required */
RETURNING
request_status,
team
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: teams
  props:
    - name: description
      value: "{{ description }}"
      description: |
        description of the team
    - name: name
      value: "{{ name }}"
      description: |
        team name
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

Edit a Team

```sql
UPDATE nvidia.orgs.teams
SET 
description = '{{ description }}',
infinity_manager_settings = '{{ infinity_manager_settings }}',
repo_scan_settings = '{{ repo_scan_settings }}'
WHERE 
team_name = '{{ team_name }}' --required
RETURNING
request_status,
team;
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

Delete a Team

```sql
DELETE FROM nvidia.orgs.teams
WHERE team_name = '{{ team_name }}' --required
;
```
</TabItem>
</Tabs>
