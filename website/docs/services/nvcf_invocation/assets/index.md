--- 
title: assets
hide_title: false
hide_table_of_contents: false
keywords:
  - assets
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

Creates, updates, deletes, gets or lists an <code>assets</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="assets" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_invocation.assets" /></td></tr>
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
    <td><CopyableCode code="asset_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Asset id (wire: assetId)</td>
</tr>
<tr>
    <td><CopyableCode code="content_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Content-type specified when creating the asset (wire: contentType)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Timestamp specified when creating the asset (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Description specified when creating the asset</td>
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
    <td><CopyableCode code="asset_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Asset id (wire: assetId)</td>
</tr>
<tr>
    <td><CopyableCode code="content_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Content-type specified when creating the asset (wire: contentType)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Timestamp specified when creating the asset (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Description specified when creating the asset</td>
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
    <td><a href="#parameter-asset_id"><code>asset_id</code></a></td>
    <td></td>
    <td>Returns details for the specified asset-id belonging to the current NVIDIA  Cloud Account. Requires a bearer token with 'invoke_function' scope in  the HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td></td>
    <td>List assets owned by the current NVIDIA Cloud Account. Requires a  bearer token with 'invoke_function' scope in the HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-content_type"><code>content_type</code></a>, <a href="#parameter-description"><code>description</code></a></td>
    <td></td>
    <td>Creates a unique id representing an asset and a pre-signed URL to upload the  asset artifact to AWS S3 bucket for the NVIDIA Cloud Account. Requires a  bearer token  with 'invoke_function' scope in the HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-asset_id"><code>asset_id</code></a></td>
    <td></td>
    <td>Deletes asset belonging to the current NVIDIA Cloud Account. Requires  a bearer token with 'invoke_function' scope in the HTTP Authorization header. </td>
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
<tr id="parameter-asset_id">
    <td><CopyableCode code="asset_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Id of the asset to be deleted</td>
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

Returns details for the specified asset-id belonging to the current NVIDIA  Cloud Account. Requires a bearer token with 'invoke_function' scope in  the HTTP Authorization header. 

```sql
SELECT
asset_id,
content_type,
created_at,
description
FROM nvidia.nvcf_invocation.assets
WHERE asset_id = '{{ asset_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

List assets owned by the current NVIDIA Cloud Account. Requires a  bearer token with 'invoke_function' scope in the HTTP Authorization header. 

```sql
SELECT
asset_id,
content_type,
created_at,
description
FROM nvidia.nvcf_invocation.assets
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

Creates a unique id representing an asset and a pre-signed URL to upload the  asset artifact to AWS S3 bucket for the NVIDIA Cloud Account. Requires a  bearer token  with 'invoke_function' scope in the HTTP Authorization header. 

```sql
INSERT INTO nvidia.nvcf_invocation.assets (
content_type,
description
)
SELECT 
'{{ content_type }}' /* required */,
'{{ description }}' /* required */
RETURNING
asset_id,
content_type,
description,
upload_url
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: assets
  props:
    - name: content_type
      value: "{{ content_type }}"
      description: |
        Content type of the asset such image/png, image/jpeg, etc.
    - name: description
      value: "{{ description }}"
      description: |
        Asset description
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

Deletes asset belonging to the current NVIDIA Cloud Account. Requires  a bearer token with 'invoke_function' scope in the HTTP Authorization header. 

```sql
DELETE FROM nvidia.nvcf_invocation.assets
WHERE asset_id = '{{ asset_id }}' --required
;
```
</TabItem>
</Tabs>
