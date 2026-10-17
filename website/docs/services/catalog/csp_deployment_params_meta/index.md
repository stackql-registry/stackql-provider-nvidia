--- 
title: csp_deployment_params_meta
hide_title: false
hide_table_of_contents: false
keywords:
  - csp_deployment_params_meta
  - catalog
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

Creates, updates, deletes, gets or lists a <code>csp_deployment_params_meta</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="csp_deployment_params_meta" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.csp_deployment_params_meta" /></td></tr>
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
    <td><CopyableCode code="cpu" /></td>
    <td><code>object</code></td>
    <td>Cloud Service Provider Deployment CPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="csp" /></td>
    <td><code>string</code></td>
    <td>Cloud Service Provider name</td>
</tr>
<tr>
    <td><CopyableCode code="gpu" /></td>
    <td><code>object</code></td>
    <td>Cloud Service Provider Deployment GPU Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="memory" /></td>
    <td><code>object</code></td>
    <td>Cloud Service Provider Deployment Memory Parameters object</td>
</tr>
<tr>
    <td><CopyableCode code="storage" /></td>
    <td><code>object</code></td>
    <td>Cloud Service Provider Deployment Storage Parameters object</td>
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
    <td><a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Get cloud service provider deployment parameters meta details</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-csp_name"><code>csp_name</code></a>, <a href="#parameter-gpu"><code>gpu</code></a>, <a href="#parameter-storage"><code>storage</code></a></td>
    <td></td>
    <td>Create cloud service provider deployment parameters meta</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Update cloud service provider deployment parameters meta</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Delete cloud service provider deployment parameters meta</td>
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
<tr id="parameter-csp_name">
    <td><CopyableCode code="csp_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Cloud service provider name</td>
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

Get cloud service provider deployment parameters meta details

```sql
SELECT
cpu,
csp,
gpu,
memory,
storage
FROM nvidia.catalog.csp_deployment_params_meta
WHERE csp_name = '{{ csp_name }}' -- required
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

Create cloud service provider deployment parameters meta

```sql
INSERT INTO nvidia.catalog.csp_deployment_params_meta (
cpu,
gpu,
memory,
storage,
csp_name
)
SELECT 
'{{ cpu }}',
'{{ gpu }}' /* required */,
'{{ memory }}',
'{{ storage }}' /* required */,
'{{ csp_name }}'
RETURNING
cpu,
csp,
gpu,
memory,
storage
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: csp_deployment_params_meta
  props:
    - name: csp_name
      value: "{{ csp_name }}"
      description: Required parameter for the csp_deployment_params_meta resource.
    - name: cpu
      description: |
        Cloud Service Provider Deployment CPU Parameters object
      value:
        count:
          defaultValue: {{ defaultValue }}
          maxValue: {{ maxValue }}
          minValue: {{ minValue }}
    - name: gpu
      description: |
        Cloud Service Provider Deployment GPU Parameters object
      value:
        count:
          defaultValue: {{ defaultValue }}
          maxValue: {{ maxValue }}
          minValue: {{ minValue }}
        type:
          defaultItemName: "{{ defaultItemName }}"
          items:
            - displayName: "{{ displayName }}"
              logo: "{{ logo }}"
              name: "{{ name }}"
    - name: memory
      description: |
        Cloud Service Provider Deployment Memory Parameters object
      value:
        capacityInGB:
          defaultValue: {{ defaultValue }}
          maxValue: {{ maxValue }}
          minValue: {{ minValue }}
    - name: storage
      description: |
        Cloud Service Provider Deployment Storage Parameters object
      value:
        capacityInGB:
          defaultValue: {{ defaultValue }}
          maxValue: {{ maxValue }}
          minValue: {{ minValue }}
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Update cloud service provider deployment parameters meta

```sql
UPDATE nvidia.catalog.csp_deployment_params_meta
SET 
cpu = '{{ cpu }}',
gpu = '{{ gpu }}',
memory = '{{ memory }}',
storage = '{{ storage }}'
WHERE 
csp_name = '{{ csp_name }}' --required
RETURNING
cpu,
csp,
gpu,
memory,
storage;
```
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

Delete cloud service provider deployment parameters meta

```sql
DELETE FROM nvidia.catalog.csp_deployment_params_meta
WHERE csp_name = '{{ csp_name }}' --required
;
```
</TabItem>
</Tabs>
