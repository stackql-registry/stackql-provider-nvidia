--- 
title: team_member_roles
hide_title: false
hide_table_of_contents: false
keywords:
  - team_member_roles
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

Creates, updates, deletes, gets or lists a <code>team_member_roles</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="team_member_roles" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.orgs.team_member_roles" /></td></tr>
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
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-user_email_or_id"><code>user_email_or_id</code></a>, <a href="#parameter-roles"><code>roles</code></a></td>
    <td></td>
    <td>Invite if user does not exist, otherwise add role in team</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-user_email_or_id"><code>user_email_or_id</code></a></td>
    <td><a href="#parameter-roles"><code>roles</code></a></td>
    <td>Remove role in team if user exists, otherwise remove invitation</td>
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
<tr id="parameter-roles">
    <td><CopyableCode code="roles" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-user_email_or_id">
    <td><CopyableCode code="user_email_or_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-roles">
    <td><CopyableCode code="roles" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="add"
    values={[
        { label: 'add', value: 'add' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add">

Invite if user does not exist, otherwise add role in team

```sql
INSERT INTO nvidia.orgs.team_member_roles (
team_name,
user_email_or_id,
roles
)
SELECT 
'{{ team_name }}',
'{{ user_email_or_id }}',
'{{ roles }}'
RETURNING
activation_token,
nca_role,
request_status,
user,
user_roles
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: team_member_roles
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the team_member_roles resource.
    - name: user_email_or_id
      value: "{{ user_email_or_id }}"
      description: Required parameter for the team_member_roles resource.
    - name: roles
      value: "{{ roles }}"
      description: Required parameter for the team_member_roles resource.
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="remove"
    values={[
        { label: 'remove', value: 'remove' }
    ]}
>
<TabItem value="remove">

Remove role in team if user exists, otherwise remove invitation

```sql
DELETE FROM nvidia.orgs.team_member_roles
WHERE team_name = '{{ team_name }}' --required
AND user_email_or_id = '{{ user_email_or_id }}' --required
AND roles = '{{ roles }}'
;
```
</TabItem>
</Tabs>
