--- 
title: team_invitations
hide_title: false
hide_table_of_contents: false
keywords:
  - team_invitations
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

Creates, updates, deletes, gets or lists a <code>team_invitations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="team_invitations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.orgs.team_invitations" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
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
    <td><code>string</code></td>
    <td>Unique invitation ID</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>user name</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Date on which the invitation was created. (ISO-8601 format) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td>Email address of the user.</td>
</tr>
<tr>
    <td><CopyableCode code="is_processed" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if the invitation has already been accepted by the user. (wire: isProcessed)</td>
</tr>
<tr>
    <td><CopyableCode code="org" /></td>
    <td><code>string</code></td>
    <td>Org to which a user was invited.</td>
</tr>
<tr>
    <td><CopyableCode code="roles" /></td>
    <td><code>array</code></td>
    <td>List of roles that the user have.</td>
</tr>
<tr>
    <td><CopyableCode code="team" /></td>
    <td><code>string</code></td>
    <td>Team to which a user was invited.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Type of invitation. The invitation is either to an organization or to a team within organization. (ORGANIZATION, TEAM)</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td><a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-q"><code>q</code></a></td>
    <td>List invitations in a team. (Team User Admin privileges required)</td>
</tr>
<tr>
    <td><a href="#create_nca"><CopyableCode code="create_nca" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td></td>
    <td>Invites and creates a User in team</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete a specific invitation in an team. (Org Admin or Team User Admin privileges required)</td>
</tr>
<tr>
    <td><a href="#resend_email"><CopyableCode code="resend_email" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Resend email of a specific invitation in a team (Org or Team User Admin privileges required).</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td> (wire: orderBy)</td>
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
<tr id="parameter-q">
    <td><CopyableCode code="q" /></td>
    <td><code>object</code></td>
    <td>User Search Parameters</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

List invitations in a team. (Team User Admin privileges required)

```sql
SELECT
id,
name,
created_date,
email,
is_processed,
org,
roles,
team,
type
FROM nvidia.orgs.team_invitations
WHERE team_name = '{{ team_name }}' -- required
AND page_number = '{{ page_number }}'
AND page_size = '{{ page_size }}'
AND order_by = '{{ order_by }}'
AND q = '{{ q }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create_nca"
    values={[
        { label: 'create_nca', value: 'create_nca' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create_nca">

Invites and creates a User in team

```sql
INSERT INTO nvidia.orgs.team_invitations (
email,
invitation_expiration_in,
invite_as,
message,
team_name
)
SELECT 
'{{ email }}',
{{ invitation_expiration_in }},
'{{ invite_as }}',
'{{ message }}',
'{{ team_name }}'
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
- name: team_invitations
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the team_invitations resource.
    - name: email
      value: "{{ email }}"
      description: |
        Is the user email
    - name: invitation_expiration_in
      value: {{ invitation_expiration_in }}
      description: |
        Is the numbers of days the invitation will expire
    - name: invite_as
      value: "{{ invite_as }}"
      description: |
        Nca allow users to be invited as Admin and as Member
      valid_values: ['ADMIN', 'MEMBER']
    - name: message
      value: "{{ message }}"
      description: |
        Is a message to the new user
`}</CodeBlock>

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

Delete a specific invitation in an team. (Org Admin or Team User Admin privileges required)

```sql
DELETE FROM nvidia.orgs.team_invitations
WHERE team_name = '{{ team_name }}' --required
AND id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="resend_email"
    values={[
        { label: 'resend_email', value: 'resend_email' }
    ]}
>
<TabItem value="resend_email">

Resend email of a specific invitation in a team (Org or Team User Admin privileges required).

```sql
EXEC nvidia.orgs.team_invitations.resend_email 
@team_name='{{ team_name }}' --required, 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
