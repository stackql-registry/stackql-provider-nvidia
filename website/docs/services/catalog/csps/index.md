--- 
title: csps
hide_title: false
hide_table_of_contents: false
keywords:
  - csps
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

Creates, updates, deletes, gets or lists a <code>csps</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="csps" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.csps" /></td></tr>
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
    <td><code>string</code></td>
    <td>Unique name of the Cloud Service Provider</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name of the Cloud Service Provider (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the Cloud Service Provider</td>
</tr>
<tr>
    <td><CopyableCode code="is_deployable" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this Cloud Service Provider can be used to deploy artifacts (wire: isDeployable)</td>
</tr>
<tr>
    <td><CopyableCode code="is_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this Cloud Service Provider is enabled (wire: isEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="labels" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="logo" /></td>
    <td><code>string</code></td>
    <td>URL for the logo image</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
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
    <td><code>string</code></td>
    <td>Unique name of the Cloud Service Provider</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name of the Cloud Service Provider (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the Cloud Service Provider</td>
</tr>
<tr>
    <td><CopyableCode code="is_deployable" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this Cloud Service Provider can be used to deploy artifacts (wire: isDeployable)</td>
</tr>
<tr>
    <td><CopyableCode code="is_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this Cloud Service Provider is enabled (wire: isEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="labels" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="logo" /></td>
    <td><code>string</code></td>
    <td>URL for the logo image</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
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
    <td>Get cloud service provider details</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-include_disabled"><code>include_disabled</code></a></td>
    <td>List cloud service providers</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Create cloud service provider</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Update cloud service provider</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-csp_name"><code>csp_name</code></a></td>
    <td></td>
    <td>Delete cloud service provider</td>
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
<tr id="parameter-include_disabled">
    <td><CopyableCode code="include_disabled" /></td>
    <td><code>boolean</code></td>
    <td>Include disabled</td>
</tr>
<tr id="parameter-page_number">
    <td><CopyableCode code="page_number" /></td>
    <td><code>integer</code></td>
    <td>Page number - zero based index</td>
</tr>
<tr id="parameter-page_size">
    <td><CopyableCode code="page_size" /></td>
    <td><code>integer</code></td>
    <td>Page size</td>
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

Get cloud service provider details

```sql
SELECT
name,
display_name,
attributes,
created_date,
description,
is_deployable,
is_enabled,
labels,
logo,
updated_date
FROM nvidia.catalog.csps
WHERE csp_name = '{{ csp_name }}' -- required
;
```
</TabItem>
<TabItem value="list">

List cloud service providers

```sql
SELECT
name,
display_name,
attributes,
created_date,
description,
is_deployable,
is_enabled,
labels,
logo,
updated_date
FROM nvidia.catalog.csps
WHERE page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND include_disabled = '{{ include_disabled }}'
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

Create cloud service provider

```sql
INSERT INTO nvidia.catalog.csps (
attributes,
description,
display_name,
is_enabled,
labels,
logo,
name
)
SELECT 
'{{ attributes }}',
'{{ description }}',
'{{ display_name }}',
{{ is_enabled }},
'{{ labels }}',
'{{ logo }}',
'{{ name }}' /* required */
RETURNING
name,
display_name,
attributes,
created_date,
description,
is_deployable,
is_enabled,
labels,
logo,
updated_date
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: csps
  props:
    - name: attributes
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: description
      value: "{{ description }}"
      description: |
        Description of the Cloud Service Provider
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Display name of the Cloud Service Provider
    - name: is_enabled
      value: {{ is_enabled }}
      description: |
        Determines if this Cloud Service Provider is enabled
    - name: labels
      value:
        - "{{ labels }}"
    - name: logo
      value: "{{ logo }}"
      description: |
        URL for the logo image
    - name: name
      value: "{{ name }}"
      description: |
        Unique name of the Cloud Service Provider
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

Update cloud service provider

```sql
UPDATE nvidia.catalog.csps
SET 
attributes = '{{ attributes }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
is_enabled = {{ is_enabled }},
labels = '{{ labels }}',
logo = '{{ logo }}'
WHERE 
csp_name = '{{ csp_name }}' --required
RETURNING
name,
display_name,
attributes,
created_date,
description,
is_deployable,
is_enabled,
labels,
logo,
updated_date;
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

Delete cloud service provider

```sql
DELETE FROM nvidia.catalog.csps
WHERE csp_name = '{{ csp_name }}' --required
;
```
</TabItem>
</Tabs>
