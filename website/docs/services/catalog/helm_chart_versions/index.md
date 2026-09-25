--- 
title: helm_chart_versions
hide_title: false
hide_table_of_contents: false
keywords:
  - helm_chart_versions
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

Creates, updates, deletes, gets or lists a <code>helm_chart_versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="helm_chart_versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.helm_chart_versions" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list_by_team', value: 'list_by_team' },
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this version (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the version</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the version in bytes (wire: totalSizeInBytes)</td>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this version (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the version</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the version in bytes (wire: totalSizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this version (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the version</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the version in bytes (wire: totalSizeInBytes)</td>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this version (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the version</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the version in bytes (wire: totalSizeInBytes)</td>
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
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td></td>
    <td>Get chart version in team as guest</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td></td>
    <td>Get chart version in org as guest</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a>, <a href="#parameter-release_type"><code>release_type</code></a></td>
    <td>List chart versions in team as guest</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a>, <a href="#parameter-release_type"><code>release_type</code></a></td>
    <td>List chart versions in org as guest</td>
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
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Version ID</td>
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
<tr id="parameter-release_type">
    <td><CopyableCode code="release_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Release Type</td>
</tr>
<tr id="parameter-sort_order">
    <td><CopyableCode code="sort_order" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Sort order</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

Get chart version in team as guest

```sql
SELECT
id,
attributes,
created_by_user,
created_date,
custom_metrics,
description,
is_signed,
malware_scan_date,
malware_scan_status,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.catalog.helm_chart_versions
WHERE org_name = '{{ org_name }}' -- required
AND team_name = '{{ team_name }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND version_id = '{{ version_id }}' -- required
;
```
</TabItem>
<TabItem value="get">

Get chart version in org as guest

```sql
SELECT
id,
attributes,
created_by_user,
created_date,
custom_metrics,
description,
is_signed,
malware_scan_date,
malware_scan_status,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.catalog.helm_chart_versions
WHERE org_name = '{{ org_name }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND version_id = '{{ version_id }}' -- required
;
```
</TabItem>
<TabItem value="list_by_team">

List chart versions in team as guest

```sql
SELECT
id,
attributes,
created_by_user,
created_date,
custom_metrics,
description,
is_signed,
malware_scan_date,
malware_scan_status,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.catalog.helm_chart_versions
WHERE org_name = '{{ org_name }}' -- required
AND team_name = '{{ team_name }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
AND release_type = '{{ release_type }}'
;
```
</TabItem>
<TabItem value="list">

List chart versions in org as guest

```sql
SELECT
id,
attributes,
created_by_user,
created_date,
custom_metrics,
description,
is_signed,
malware_scan_date,
malware_scan_status,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.catalog.helm_chart_versions
WHERE org_name = '{{ org_name }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
AND release_type = '{{ release_type }}'
;
```
</TabItem>
</Tabs>
