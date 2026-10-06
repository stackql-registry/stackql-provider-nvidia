--- 
title: invocation_status
hide_title: false
hide_table_of_contents: false
keywords:
  - invocation_status
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

Creates, updates, deletes, gets or lists an <code>invocation_status</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="invocation_status" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_invocation.invocation_status" /></td></tr>
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
    <td><CopyableCode code="response" /></td>
    <td><code>string</code></td>
    <td>The invocation response body as returned by the function (JSON text); empty while the request is still pending (HTTP 202)</td>
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
    <td>Deprecated and will be removed soon. Please use the new NVCF Invocation API  endpoint to invoke a function and stream results without polling.  Retrieves the status of an in-progress or pending request using its unique  invocation request ID. If the result is available, it will be included in  the response, marking the request as fulfilled. Conversely, if the result is  not yet available, the request is deemed pending. Access to this endpoint  mandates inclusion of a bearer token with 'invoke_function' scope in the  HTTP Authorization header. In-progress responses are returned in order. If no in-progress response is received  during polling you will receive the most recent in-progress response. Only the first  256 unread in-progress messages are kept. </td>
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
    <td>Invocation Request Id</td>
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

Deprecated and will be removed soon. Please use the new NVCF Invocation API  endpoint to invoke a function and stream results without polling.  Retrieves the status of an in-progress or pending request using its unique  invocation request ID. If the result is available, it will be included in  the response, marking the request as fulfilled. Conversely, if the result is  not yet available, the request is deemed pending. Access to this endpoint  mandates inclusion of a bearer token with 'invoke_function' scope in the  HTTP Authorization header. In-progress responses are returned in order. If no in-progress response is received  during polling you will receive the most recent in-progress response. Only the first  256 unread in-progress messages are kept. 

```sql
SELECT
response
FROM nvidia.nvcf_invocation.invocation_status
WHERE request_id = '{{ request_id }}' -- required
;
```
</TabItem>
</Tabs>
