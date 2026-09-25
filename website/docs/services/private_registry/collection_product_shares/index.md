--- 
title: collection_product_shares
hide_title: false
hide_table_of_contents: false
keywords:
  - collection_product_shares
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

Creates, updates, deletes, gets or lists a <code>collection_product_shares</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="collection_product_shares" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.collection_product_shares" /></td></tr>
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
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a></td>
    <td></td>
    <td>Publish collection to product</td>
</tr>
<tr>
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a></td>
    <td></td>
    <td>Publish collection to product</td>
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
<tr id="parameter-collection_name">
    <td><CopyableCode code="collection_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Collection name</td>
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
    defaultValue="add_by_team"
    values={[
        { label: 'add_by_team', value: 'add_by_team' },
        { label: 'add', value: 'add' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add_by_team">

Publish collection to product

```sql
INSERT INTO nvidia.private_registry.collection_product_shares (
access_type,
can_guest_pull,
can_public_list,
is_public,
product_names,
team_name,
collection_name
)
SELECT 
'{{ access_type }}',
{{ can_guest_pull }},
{{ can_public_list }},
{{ is_public }},
'{{ product_names }}',
'{{ team_name }}',
'{{ collection_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add">

Publish collection to product

```sql
INSERT INTO nvidia.private_registry.collection_product_shares (
access_type,
can_guest_pull,
can_public_list,
is_public,
product_names,
collection_name
)
SELECT 
'{{ access_type }}',
{{ can_guest_pull }},
{{ can_public_list }},
{{ is_public }},
'{{ product_names }}',
'{{ collection_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: collection_product_shares
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the collection_product_shares resource.
    - name: collection_name
      value: "{{ collection_name }}"
      description: Required parameter for the collection_product_shares resource.
    - name: access_type
      value: "{{ access_type }}"
      valid_values: ['LISTED', 'EXCLUSIVE', 'NOT_LISTED']
    - name: can_guest_pull
      value: {{ can_guest_pull }}
    - name: can_public_list
      value: {{ can_public_list }}
    - name: is_public
      value: {{ is_public }}
    - name: product_names
      value:
        - "{{ product_names }}"
`}</CodeBlock>

</TabItem>
</Tabs>
