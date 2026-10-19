--- 
title: model_encryption_keys
hide_title: false
hide_table_of_contents: false
keywords:
  - model_encryption_keys
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

Creates, updates, deletes, gets or lists a <code>model_encryption_keys</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="model_encryption_keys" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.model_encryption_keys" /></td></tr>
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
    <td><a href="#delete_by_team"><CopyableCode code="delete_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>Disassociate encryption key from model in team and mark it for offline deletion</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>Disassociate encryption key from model in org and mark it for offline deletion</td>
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
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
</tbody>
</table>

## `DELETE` examples

<Tabs
    defaultValue="delete_by_team"
    values={[
        { label: 'delete_by_team', value: 'delete_by_team' },
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete_by_team">

Disassociate encryption key from model in team and mark it for offline deletion

```sql
DELETE FROM nvidia.private_registry.model_encryption_keys
WHERE team_name = '{{ team_name }}' --required
AND model_name = '{{ model_name }}' --required
;
```
</TabItem>
<TabItem value="delete">

Disassociate encryption key from model in org and mark it for offline deletion

```sql
DELETE FROM nvidia.private_registry.model_encryption_keys
WHERE model_name = '{{ model_name }}' --required
;
```
</TabItem>
</Tabs>
