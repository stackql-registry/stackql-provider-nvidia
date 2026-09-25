--- 
title: artifact_collections
hide_title: false
hide_table_of_contents: false
keywords:
  - artifact_collections
  - private_registry
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

Creates, updates, deletes, gets or lists an <code>artifact_collections</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="artifact_collections" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.artifact_collections" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list_by_team"
    values={[
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_by_team">

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
    <td>Unique name of the collection</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the collection belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the collection belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the collection (wire: builtBy)</td>
</tr>
<tr>
    <td><CopyableCode code="can_guest_download" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if a guest user can download (wire: canGuestDownload)</td>
</tr>
<tr>
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td> (HEALTHCARE, SMART_CITIES, RETAIL, MANUFACTURING, SUPERCOMPUTING, ROBOTICS, AUTOMOTIVE, TELECOMMUNICATIONS, FINANCE, OIL_AND_GAS, NATURAL_LANGUAGE_PROCESSING, AUTOMATIC_SPEECH_RECOGNITION, INTELLIGENT_VIDEO_ANALYTICS, OBJECT_DETECTION, IMAGE_CLASSIFICATION, ANNOTATION, IMAGE_SYNTHESIS, MACHINE_LEARNING, DEEP_LEARNING, INFRASTRUCTURE, HIGH_PERFORMANCE_COMPUTING, WINDOWS_RTX_ACCELERATED_MODELS, BEGINNER, ADVANCED)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the collection</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this collection is publicly accessible (wire: isPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="is_read_only" /></td>
    <td><code>boolean</code></td>
    <td>indicate if current user has read only permissions (deprecated) (wire: isReadOnly)</td>
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
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>Organization that published this collection</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the collection (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="size" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total count of collection items</td>
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
    <td>Unique name of the collection</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the collection belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the collection belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the collection (wire: builtBy)</td>
</tr>
<tr>
    <td><CopyableCode code="can_guest_download" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if a guest user can download (wire: canGuestDownload)</td>
</tr>
<tr>
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td> (HEALTHCARE, SMART_CITIES, RETAIL, MANUFACTURING, SUPERCOMPUTING, ROBOTICS, AUTOMOTIVE, TELECOMMUNICATIONS, FINANCE, OIL_AND_GAS, NATURAL_LANGUAGE_PROCESSING, AUTOMATIC_SPEECH_RECOGNITION, INTELLIGENT_VIDEO_ANALYTICS, OBJECT_DETECTION, IMAGE_CLASSIFICATION, ANNOTATION, IMAGE_SYNTHESIS, MACHINE_LEARNING, DEEP_LEARNING, INFRASTRUCTURE, HIGH_PERFORMANCE_COMPUTING, WINDOWS_RTX_ACCELERATED_MODELS, BEGINNER, ADVANCED)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the collection</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this collection is publicly accessible (wire: isPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="is_read_only" /></td>
    <td><code>boolean</code></td>
    <td>indicate if current user has read only permissions (deprecated) (wire: isReadOnly)</td>
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
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>Organization that published this collection</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the collection (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="size" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total count of collection items</td>
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
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List artifact collections the user can access in the specified org and team</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List artifact collections the user can access in the specified org</td>
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
<tr id="parameter-artifact_name">
    <td><CopyableCode code="artifact_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact name</td>
</tr>
<tr id="parameter-artifact_type">
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact type</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Order by</td>
</tr>
<tr id="parameter-page_number">
    <td><CopyableCode code="page_number" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Page number - zero based index</td>
</tr>
<tr id="parameter-page_size">
    <td><CopyableCode code="page_size" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Page size</td>
</tr>
<tr id="parameter-remove_unresolved_labels">
    <td><CopyableCode code="remove_unresolved_labels" /></td>
    <td><code>boolean</code></td>
    <td>Remove unresolved labels</td>
</tr>
<tr id="parameter-resolve_labels">
    <td><CopyableCode code="resolve_labels" /></td>
    <td><code>boolean</code></td>
    <td>Resolve labels</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list_by_team"
    values={[
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_by_team">

List artifact collections the user can access in the specified org and team

```sql
SELECT
name,
display_name,
org_name,
owner_name,
team_name,
access_type,
attributes,
built_by,
can_guest_download,
category,
created_date,
description,
is_public,
is_read_only,
labels,
logo,
policy_labels,
product_names,
publisher,
short_description,
size,
updated_date
FROM nvidia.private_registry.artifact_collections
WHERE team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND order_by = '{{ order_by }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list">

List artifact collections the user can access in the specified org

```sql
SELECT
name,
display_name,
org_name,
owner_name,
team_name,
access_type,
attributes,
built_by,
can_guest_download,
category,
created_date,
description,
is_public,
is_read_only,
labels,
logo,
policy_labels,
product_names,
publisher,
short_description,
size,
updated_date
FROM nvidia.private_registry.artifact_collections
WHERE artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND order_by = '{{ order_by }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
</Tabs>
