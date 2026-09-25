--- 
title: artifact_specs
hide_title: false
hide_table_of_contents: false
keywords:
  - artifact_specs
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

Creates, updates, deletes, gets or lists an <code>artifact_specs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="artifact_specs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.artifact_specs" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' }
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
    <td><CopyableCode code="nvcf_function_id" /></td>
    <td><code>string</code></td>
    <td>NVCF function id for the model playground (wire: nvcfFunctionId)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_name" /></td>
    <td><code>string</code></td>
    <td>Unique name of the model (wire: artifactName)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>ArtifactTypeEnum of the artifact (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>string</code></td>
    <td>Metadata json string</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="namespace" /></td>
    <td><code>string</code></td>
    <td>org/team of the model</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_inference_path" /></td>
    <td><code>string</code></td>
    <td>NVCF inference path (invocation route) for the model playground (wire: nvcfInferencePath)</td>
</tr>
<tr>
    <td><CopyableCode code="open_api_spec" /></td>
    <td><code>string</code></td>
    <td>OpenAPI specification for this model (wire: openAPISpec)</td>
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
    <td><CopyableCode code="nvcf_function_id" /></td>
    <td><code>string</code></td>
    <td>NVCF function id for the model playground (wire: nvcfFunctionId)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_name" /></td>
    <td><code>string</code></td>
    <td>Unique name of the model (wire: artifactName)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>ArtifactTypeEnum of the artifact (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>string</code></td>
    <td>Metadata json string</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="namespace" /></td>
    <td><code>string</code></td>
    <td>org/team of the model</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_inference_path" /></td>
    <td><code>string</code></td>
    <td>NVCF inference path (invocation route) for the model playground (wire: nvcfInferencePath)</td>
</tr>
<tr>
    <td><CopyableCode code="open_api_spec" /></td>
    <td><code>string</code></td>
    <td>OpenAPI specification for this model (wire: openAPISpec)</td>
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
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Get AI Playground for public artifactType</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Get AI Playground for public artifactType</td>
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
    <td>Model name</td>
</tr>
<tr id="parameter-artifact_type">
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact type</td>
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
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get_by_team">

Get AI Playground for public artifactType

```sql
SELECT
nvcf_function_id,
artifact_name,
artifact_type,
attributes,
created_date,
namespace,
nvcf_inference_path,
open_api_spec,
updated_date
FROM nvidia.catalog.artifact_specs
WHERE org_name = '{{ org_name }}' -- required
AND team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
;
```
</TabItem>
<TabItem value="get">

Get AI Playground for public artifactType

```sql
SELECT
nvcf_function_id,
artifact_name,
artifact_type,
attributes,
created_date,
namespace,
nvcf_inference_path,
open_api_spec,
updated_date
FROM nvidia.catalog.artifact_specs
WHERE org_name = '{{ org_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
;
```
</TabItem>
</Tabs>
