--- 
title: artifact_shares
hide_title: false
hide_table_of_contents: false
keywords:
  - artifact_shares
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

Creates, updates, deletes, gets or lists an <code>artifact_shares</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="artifact_shares" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.artifact_shares" /></td></tr>
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
    <td><a href="#add_by_team"><CopyableCode code="add_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-guest_can_download"><code>guest_can_download</code></a></td>
    <td><a href="#parameter-public_can_list"><code>public_can_list</code></a></td>
    <td>Publish artifact to public</td>
</tr>
<tr>
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-guest_can_download"><code>guest_can_download</code></a></td>
    <td><a href="#parameter-public_can_list"><code>public_can_list</code></a></td>
    <td>Publish artifact to public</td>
</tr>
<tr>
    <td><a href="#remove_by_team"><CopyableCode code="remove_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Undo publishing of artifact to public</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Undo publishing of artifact to public</td>
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
<tr id="parameter-guest_can_download">
    <td><CopyableCode code="guest_can_download" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if guest users can download this artifact</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
<tr id="parameter-public_can_list">
    <td><CopyableCode code="public_can_list" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if artifact is listed publicly</td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="add_by_team"
    values={[
        { label: 'add_by_team', value: 'add_by_team' },
        { label: 'add', value: 'add' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add_by_team">

Publish artifact to public

```sql
INSERT INTO nvidia.private_registry.artifact_shares (
team_name,
artifact_type,
artifact_name,
guest_can_download,
public_can_list
)
SELECT 
'{{ team_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}',
'{{ guest_can_download }}',
'{{ public_can_list }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add">

Publish artifact to public

```sql
INSERT INTO nvidia.private_registry.artifact_shares (
artifact_type,
artifact_name,
guest_can_download,
public_can_list
)
SELECT 
'{{ artifact_type }}',
'{{ artifact_name }}',
'{{ guest_can_download }}',
'{{ public_can_list }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: artifact_shares
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the artifact_shares resource.
    - name: artifact_type
      value: "{{ artifact_type }}"
      description: Required parameter for the artifact_shares resource.
    - name: artifact_name
      value: "{{ artifact_name }}"
      description: Required parameter for the artifact_shares resource.
    - name: guest_can_download
      value: {{ guest_can_download }}
      description: Required parameter for the artifact_shares resource.
    - name: public_can_list
      value: {{ public_can_list }}
      description: Indicates if artifact is listed publicly
      description: Indicates if artifact is listed publicly
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="remove_by_team"
    values={[
        { label: 'remove_by_team', value: 'remove_by_team' },
        { label: 'remove', value: 'remove' }
    ]}
>
<TabItem value="remove_by_team">

Undo publishing of artifact to public

```sql
DELETE FROM nvidia.private_registry.artifact_shares
WHERE team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="remove">

Undo publishing of artifact to public

```sql
DELETE FROM nvidia.private_registry.artifact_shares
WHERE artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
</Tabs>
