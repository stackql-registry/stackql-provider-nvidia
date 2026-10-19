--- 
title: telemetries
hide_title: false
hide_table_of_contents: false
keywords:
  - telemetries
  - nvcf_deployments
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

Creates, updates, deletes, gets or lists a <code>telemetries</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="telemetries" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_deployments.telemetries" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
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
    <td><CopyableCode code="name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Telemetry name</td>
</tr>
<tr>
    <td><CopyableCode code="telemetry_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique telemetry ID (wire: telemetryId)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Telemetry creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>URL for the telemetry endpoint</td>
</tr>
<tr>
    <td><CopyableCode code="protocol" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Protocol used for communication (HTTP, GRPC)</td>
</tr>
<tr>
    <td><CopyableCode code="provider" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Telemetry provider (PROMETHEUS, GRAFANA_CLOUD, SPLUNK, DATADOG, SERVICENOW, KRATOS, KRATOS_THANOS, TIMESTREAM, VICTORIAMETRICS, AZURE_MONITOR, OTEL_COLLECTOR)</td>
</tr>
<tr>
    <td><CopyableCode code="types" /></td>
    <td><code>array</code></td>
    <td>Set of telemetry data types</td>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Telemetry name</td>
</tr>
<tr>
    <td><CopyableCode code="telemetry_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique telemetry ID (wire: telemetryId)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Telemetry creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>URL for the telemetry endpoint</td>
</tr>
<tr>
    <td><CopyableCode code="protocol" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Protocol used for communication (HTTP, GRPC)</td>
</tr>
<tr>
    <td><CopyableCode code="provider" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Telemetry provider (PROMETHEUS, GRAFANA_CLOUD, SPLUNK, DATADOG, SERVICENOW, KRATOS, KRATOS_THANOS, TIMESTREAM, VICTORIAMETRICS, AZURE_MONITOR, OTEL_COLLECTOR)</td>
</tr>
<tr>
    <td><CopyableCode code="types" /></td>
    <td><code>array</code></td>
    <td>Set of telemetry data types</td>
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
    <td><a href="#parameter-telemetry_id"><code>telemetry_id</code></a></td>
    <td></td>
    <td>Retrieves the details of a specific telemetry configuration by its ID.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. </td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td></td>
    <td>Retrieves telemetry configurations for a specific NVIDIA Cloud Account.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. </td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-protocol"><code>protocol</code></a>, <a href="#parameter-provider"><code>provider</code></a>, <a href="#parameter-secret"><code>secret</code></a>, <a href="#parameter-types"><code>types</code></a></td>
    <td></td>
    <td>Creates telemetry endpoints for NVIDIA Cloud Accounts.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. </td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-telemetry_id"><code>telemetry_id</code></a></td>
    <td></td>
    <td>Deletes a specific telemetry configuration for a NVIDIA Cloud Account.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. If there any functions that are dependent on the  Telemetry that is being deleted, then response with 400 status code will  be returned. </td>
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
<tr id="parameter-telemetry_id">
    <td><CopyableCode code="telemetry_id" /></td>
    <td><code>string (uuid)</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Retrieves the details of a specific telemetry configuration by its ID.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. 

```sql
SELECT
name,
telemetry_id,
created_at,
endpoint,
protocol,
provider,
types
FROM nvidia.nvcf_deployments.telemetries
WHERE telemetry_id = '{{ telemetry_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Retrieves telemetry configurations for a specific NVIDIA Cloud Account.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. 

```sql
SELECT
name,
telemetry_id,
created_at,
endpoint,
protocol,
provider,
types
FROM nvidia.nvcf_deployments.telemetries
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Creates telemetry endpoints for NVIDIA Cloud Accounts.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. 

```sql
INSERT INTO nvidia.nvcf_deployments.telemetries (
endpoint,
protocol,
provider,
secret,
types
)
SELECT 
'{{ endpoint }}' /* required */,
'{{ protocol }}' /* required */,
'{{ provider }}' /* required */,
'{{ secret }}' /* required */,
'{{ types }}' /* required */
RETURNING
telemetry
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: telemetries
  props:
    - name: endpoint
      value: "{{ endpoint }}"
      description: |
        Telemetry endpoint URL
    - name: protocol
      value: "{{ protocol }}"
      description: |
        Protocol used for communication
      valid_values: ['HTTP', 'GRPC']
    - name: provider
      value: "{{ provider }}"
      description: |
        Telemetry provider
      valid_values: ['PROMETHEUS', 'GRAFANA_CLOUD', 'SPLUNK', 'DATADOG', 'SERVICENOW', 'KRATOS', 'KRATOS_THANOS', 'TIMESTREAM', 'VICTORIAMETRICS', 'AZURE_MONITOR', 'OTEL_COLLECTOR']
    - name: secret
      description: |
        Single secret associated with the telemetry configuration
      value:
        name: "{{ name }}"
        value: "{{ value }}"
    - name: types
      value:
        - "{{ types }}"
      description: |
        Set of telemetry data types
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

Deletes a specific telemetry configuration for a NVIDIA Cloud Account.  requires a bearer token with 'manage_telemetries' scope in the HTTP  Authorization header. If there any functions that are dependent on the  Telemetry that is being deleted, then response with 400 status code will  be returned. 

```sql
DELETE FROM nvidia.nvcf_deployments.telemetries
WHERE telemetry_id = '{{ telemetry_id }}' --required
;
```
</TabItem>
</Tabs>
