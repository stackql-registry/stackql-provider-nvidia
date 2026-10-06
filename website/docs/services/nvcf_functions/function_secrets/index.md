--- 
title: function_secrets
hide_title: false
hide_table_of_contents: false
keywords:
  - function_secrets
  - nvcf_functions
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

Creates, updates, deletes, gets or lists a <code>function_secrets</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="function_secrets" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_functions.function_secrets" /></td></tr>
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
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-version_id"><code>version_id</code></a>, <a href="#parameter-secrets"><code>secrets</code></a></td>
    <td></td>
    <td>Updates secrets for the specified function version. This endpoint  requires a bearer token with 'update_secrets' scope in the HTTP  Authorization header. </td>
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
    <td>Function Id</td>
</tr>
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function Version Id</td>
</tr>
</tbody>
</table>

## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Updates secrets for the specified function version. This endpoint  requires a bearer token with 'update_secrets' scope in the HTTP  Authorization header. 

```sql
UPDATE nvidia.nvcf_functions.function_secrets
SET 
secrets = '{{ secrets }}'
WHERE 
function_id = '{{ function_id }}' --required
AND version_id = '{{ version_id }}' --required
AND secrets = '{{ secrets }}' --required;
```
</TabItem>
</Tabs>
