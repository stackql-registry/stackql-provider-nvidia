--- 
title: queue_positions
hide_title: false
hide_table_of_contents: false
keywords:
  - queue_positions
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

Creates, updates, deletes, gets or lists a <code>queue_positions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="queue_positions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_queues.queue_positions" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
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
    <td><CopyableCode code="function_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function id (wire: functionId)</td>
</tr>
<tr>
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id (wire: functionVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="position_in_queue" /></td>
    <td><code>integer (int32)</code></td>
    <td>Position of request in queue (wire: positionInQueue)</td>
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
    <td><a href="#parameter-request_id"><code>request_id</code></a></td>
    <td></td>
    <td>Using the specified function invocation request id, returns the estimated  position of the corresponding message up to 1000 in the queue. Requires a bearer token or an api-key with 'queue_details' scope in the HTTP  Authorization header. </td>
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
<tr id="parameter-request_id">
    <td><CopyableCode code="request_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function invocation request id</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Using the specified function invocation request id, returns the estimated  position of the corresponding message up to 1000 in the queue. Requires a bearer token or an api-key with 'queue_details' scope in the HTTP  Authorization header. 

```sql
SELECT
function_id,
function_version_id,
position_in_queue
FROM nvidia.nvcf_queues.queue_positions
WHERE request_id = '{{ request_id }}' -- required
;
```
</TabItem>
</Tabs>
