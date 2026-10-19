--- 
title: invocations
hide_title: false
hide_table_of_contents: false
keywords:
  - invocations
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

Creates, updates, deletes, gets or lists an <code>invocations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="invocations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_invocation.invocations" /></td></tr>
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
    <td><a href="#invoke"><CopyableCode code="invoke" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-body"><code>body</code></a></td>
    <td><a href="#parameter-NVCF-INPUT-ASSET-REFERENCES"><code>NVCF-INPUT-ASSET-REFERENCES</code></a>, <a href="#parameter-NVCF-POLL-SECONDS"><code>NVCF-POLL-SECONDS</code></a></td>
    <td>Deprecated and will be removed soon. Please use the new NVCF Invocation API  endpoint to invoke a function.  Invokes the specified function that was successfully deployed. If the version  is not specified, any active function versions will handle the request. If  the version is specified in the URI, then the request is exclusively processed  by the designated version of the function. By default, this endpoint will block  for 5 seconds. If the request is not fulfilled before the timeout, it's status  is considered in-progress or pending and the response includes HTTP status code  202 with an invocation request ID, indicating that the client should commence  polling for the result using the invocation request ID. Access to this endpoint  mandates inclusion of a bearer token with 'invoke_function' scope in the  HTTP Authorization header. Additionally, this endpoint has the capability to  provide updates on the progress of the request, contingent upon the workload's  provision of such information. In-progress responses are returned in order. If no in-progress response is received  during polling you will receive the most recent in-progress response. Only the first  256 unread in-progress messages are kept. </td>
</tr>
<tr>
    <td><a href="#invoke_version"><CopyableCode code="invoke_version" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-version_id"><code>version_id</code></a>, <a href="#parameter-body"><code>body</code></a></td>
    <td><a href="#parameter-NVCF-INPUT-ASSET-REFERENCES"><code>NVCF-INPUT-ASSET-REFERENCES</code></a>, <a href="#parameter-NVCF-POLL-SECONDS"><code>NVCF-POLL-SECONDS</code></a></td>
    <td>Deprecated and will be removed soon. Please use the new NVCF Invocation API  endpoint to invoke a function.  Invokes the specified function that was successfully deployed. If the version  is not specified, any active function versions will handle the request. If  the version is specified in the URI, then the request is exclusively processed  by the designated version of the function. By default, this endpoint will block  for 5 seconds. If the request is not fulfilled before the timeout, it's status  is considered in-progress or pending and the response includes HTTP status code  202 with an invocation request ID, indicating that the client should commence  polling for the result using the invocation request ID. Access to this endpoint  mandates inclusion of a bearer token with 'invoke_function' scope in the  HTTP Authorization header. Additionally, this endpoint has the capability to  provide updates on the progress of the request, contingent upon the workload's  provision of such information. In-progress responses are returned in order. If no in-progress response is received  during polling you will receive the most recent in-progress response. Only the first  256 unread in-progress messages are kept. </td>
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
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id</td>
</tr>
<tr id="parameter-NVCF-INPUT-ASSET-REFERENCES">
    <td><CopyableCode code="NVCF-INPUT-ASSET-REFERENCES" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-NVCF-POLL-SECONDS">
    <td><CopyableCode code="NVCF-POLL-SECONDS" /></td>
    <td><code>integer (int32)</code></td>
    <td></td>
</tr>
</tbody>
</table>

## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="invoke"
    values={[
        { label: 'invoke', value: 'invoke' },
        { label: 'invoke_version', value: 'invoke_version' }
    ]}
>
<TabItem value="invoke">

Deprecated and will be removed soon. Please use the new NVCF Invocation API  endpoint to invoke a function.  Invokes the specified function that was successfully deployed. If the version  is not specified, any active function versions will handle the request. If  the version is specified in the URI, then the request is exclusively processed  by the designated version of the function. By default, this endpoint will block  for 5 seconds. If the request is not fulfilled before the timeout, it's status  is considered in-progress or pending and the response includes HTTP status code  202 with an invocation request ID, indicating that the client should commence  polling for the result using the invocation request ID. Access to this endpoint  mandates inclusion of a bearer token with 'invoke_function' scope in the  HTTP Authorization header. Additionally, this endpoint has the capability to  provide updates on the progress of the request, contingent upon the workload's  provision of such information. In-progress responses are returned in order. If no in-progress response is received  during polling you will receive the most recent in-progress response. Only the first  256 unread in-progress messages are kept. 

```sql
EXEC nvidia.nvcf_invocation.invocations.invoke 
@function_id='{{ function_id }}' --required, 
@NVCF-INPUT-ASSET-REFERENCES='{{ NVCF-INPUT-ASSET-REFERENCES }}', 
@NVCF-POLL-SECONDS='{{ NVCF-POLL-SECONDS }}' 
@@json=
'{
"body": "{{ body }}"
}'
;
```
</TabItem>
<TabItem value="invoke_version">

Deprecated and will be removed soon. Please use the new NVCF Invocation API  endpoint to invoke a function.  Invokes the specified function that was successfully deployed. If the version  is not specified, any active function versions will handle the request. If  the version is specified in the URI, then the request is exclusively processed  by the designated version of the function. By default, this endpoint will block  for 5 seconds. If the request is not fulfilled before the timeout, it's status  is considered in-progress or pending and the response includes HTTP status code  202 with an invocation request ID, indicating that the client should commence  polling for the result using the invocation request ID. Access to this endpoint  mandates inclusion of a bearer token with 'invoke_function' scope in the  HTTP Authorization header. Additionally, this endpoint has the capability to  provide updates on the progress of the request, contingent upon the workload's  provision of such information. In-progress responses are returned in order. If no in-progress response is received  during polling you will receive the most recent in-progress response. Only the first  256 unread in-progress messages are kept. 

```sql
EXEC nvidia.nvcf_invocation.invocations.invoke_version 
@function_id='{{ function_id }}' --required, 
@version_id='{{ version_id }}' --required, 
@NVCF-INPUT-ASSET-REFERENCES='{{ NVCF-INPUT-ASSET-REFERENCES }}', 
@NVCF-POLL-SECONDS='{{ NVCF-POLL-SECONDS }}' 
@@json=
'{
"body": "{{ body }}"
}'
;
```
</TabItem>
</Tabs>
