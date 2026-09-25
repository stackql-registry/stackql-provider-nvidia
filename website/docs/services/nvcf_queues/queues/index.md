--- 
title: queues
hide_title: false
hide_table_of_contents: false
keywords:
  - queues
  - nvcf_queues
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

Creates, updates, deletes, gets or lists a <code>queues</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="queues" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_queues.queues" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list_version"
    values={[
        { label: 'list_version', value: 'list_version' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_version">

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
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id (wire: functionVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function name (wire: functionName)</td>
</tr>
<tr>
    <td><CopyableCode code="function_status" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function status (ACTIVE, DEPLOYING, ERROR, INACTIVE, DELETED, DEGRADED, DEGRADING) (wire: functionStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="queue_depth" /></td>
    <td><code>integer (int32)</code></td>
    <td>Approximate number of messages in the request queue (wire: queueDepth)</td>
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
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id (wire: functionVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function name (wire: functionName)</td>
</tr>
<tr>
    <td><CopyableCode code="function_status" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function status (ACTIVE, DEPLOYING, ERROR, INACTIVE, DELETED, DEGRADED, DEGRADING) (wire: functionStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="queue_depth" /></td>
    <td><code>integer (int32)</code></td>
    <td>Approximate number of messages in the request queue (wire: queueDepth)</td>
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
    <td><a href="#list_version"><CopyableCode code="list_version" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td></td>
    <td>Provides details of all the queues associated with the specified function.  If a function has multiple versions and they are all deployed, then the  response includes details of all the queues. If the specified function  is public, then Account Admin cannot perform this operation. Requires a bearer token or an api-key with 'queue_details' scope in the HTTP  Authorization header. </td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a></td>
    <td></td>
    <td>Provides details of all the queues associated with the specified function.  If a function has multiple versions and they are all deployed, then the  response includes details of all the queues. If the specified function  is public, then Account Admin cannot perform this operation. Requires a bearer token or an api-key with 'queue_details' scope in the HTTP  Authorization header. </td>
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
    <td>Function id</td>
</tr>
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list_version"
    values={[
        { label: 'list_version', value: 'list_version' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_version">

Provides details of all the queues associated with the specified function.  If a function has multiple versions and they are all deployed, then the  response includes details of all the queues. If the specified function  is public, then Account Admin cannot perform this operation. Requires a bearer token or an api-key with 'queue_details' scope in the HTTP  Authorization header. 

```sql
SELECT
function_version_id,
function_name,
function_status,
queue_depth
FROM nvidia.nvcf_queues.queues
WHERE function_id = '{{ function_id }}' -- required
AND version_id = '{{ version_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Provides details of all the queues associated with the specified function.  If a function has multiple versions and they are all deployed, then the  response includes details of all the queues. If the specified function  is public, then Account Admin cannot perform this operation. Requires a bearer token or an api-key with 'queue_details' scope in the HTTP  Authorization header. 

```sql
SELECT
function_version_id,
function_name,
function_status,
queue_depth
FROM nvidia.nvcf_queues.queues
WHERE function_id = '{{ function_id }}' -- required
;
```
</TabItem>
</Tabs>
