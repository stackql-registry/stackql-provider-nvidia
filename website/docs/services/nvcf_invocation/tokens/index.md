--- 
title: tokens
hide_title: false
hide_table_of_contents: false
keywords:
  - tokens
  - nvcf_invocation
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

Creates, updates, deletes, gets or lists a <code>tokens</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="tokens" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_invocation.tokens" /></td></tr>
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
    <td><a href="#create_for_functions"><CopyableCode code="create_for_functions" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-clientId"><code>clientId</code></a>, <a href="#parameter-functions"><code>functions</code></a></td>
    <td></td>
    <td>Issues an assertion token from Notary Service for specified functionIds and/or functionVersionIds </td>
</tr>
<tr>
    <td><a href="#create_for_function"><CopyableCode code="create_for_function" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-clientId"><code>clientId</code></a></td>
    <td></td>
    <td>Issues an assertion token from Notary Service for a specific functionId and/or functionVersionId </td>
</tr>
<tr>
    <td><a href="#create_for_version"><CopyableCode code="create_for_version" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a>, <a href="#parameter-clientId"><code>clientId</code></a></td>
    <td></td>
    <td>Issues an assertion token from Notary Service for a specific functionId and/or functionVersionId </td>
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
<tr id="parameter-function_id">
    <td><CopyableCode code="function_id" /></td>
    <td><code>string (uuid)</code></td>
    <td></td>
</tr>
<tr id="parameter-function_version_id">
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id</td>
</tr>
</tbody>
</table>

## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="create_for_functions"
    values={[
        { label: 'create_for_functions', value: 'create_for_functions' },
        { label: 'create_for_function', value: 'create_for_function' },
        { label: 'create_for_version', value: 'create_for_version' }
    ]}
>
<TabItem value="create_for_functions">

Issues an assertion token from Notary Service for specified functionIds and/or functionVersionIds 

```sql
EXEC nvidia.nvcf_invocation.tokens.create_for_functions 
@@json=
'{
"clientId": "{{ clientId }}", 
"functions": "{{ functions }}"
}'
;
```
</TabItem>
<TabItem value="create_for_function">

Issues an assertion token from Notary Service for a specific functionId and/or functionVersionId 

```sql
EXEC nvidia.nvcf_invocation.tokens.create_for_function 
@function_id='{{ function_id }}' --required 
@@json=
'{
"clientId": "{{ clientId }}"
}'
;
```
</TabItem>
<TabItem value="create_for_version">

Issues an assertion token from Notary Service for a specific functionId and/or functionVersionId 

```sql
EXEC nvidia.nvcf_invocation.tokens.create_for_version 
@function_id='{{ function_id }}' --required, 
@function_version_id='{{ function_version_id }}' --required 
@@json=
'{
"clientId": "{{ clientId }}"
}'
;
```
</TabItem>
</Tabs>
