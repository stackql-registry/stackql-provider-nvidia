--- 
title: collections
hide_title: false
hide_table_of_contents: false
keywords:
  - collections
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

Creates, updates, deletes, gets or lists a <code>collections</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="collections" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.collections" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

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
    <td><a href="#get_by_team"><CopyableCode code="get_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a></td>
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>Get collection details in team as guest</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a></td>
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>Get collection details in org as guest</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a></td>
    <td>List public collections</td>
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
<tr id="parameter-collection_name">
    <td><CopyableCode code="collection_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Collection name</td>
</tr>
<tr id="parameter-org_name">
    <td><CopyableCode code="org_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Organization name</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
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
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

Get collection details in team as guest

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
FROM nvidia.catalog.collections
WHERE org_name = '{{ org_name }}' -- required
AND team_name = '{{ team_name }}' -- required
AND collection_name = '{{ collection_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="get">

Get collection details in org as guest

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
FROM nvidia.catalog.collections
WHERE org_name = '{{ org_name }}' -- required
AND collection_name = '{{ collection_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list">

List public collections

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
FROM nvidia.catalog.collections
WHERE page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
;
```
</TabItem>
</Tabs>
