--- 
title: artifact_specs
hide_title: false
hide_table_of_contents: false
keywords:
  - artifact_specs
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

Creates, updates, deletes, gets or lists an <code>artifact_specs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="artifact_specs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.artifact_specs" /></td></tr>
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
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Get AI Playground for artifactType</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Get AI Playground for artifactType</td>
</tr>
<tr>
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-nvcf_function_id"><code>nvcf_function_id</code></a></td>
    <td></td>
    <td>Create AI Playground for artifactType</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-nvcf_function_id"><code>nvcf_function_id</code></a></td>
    <td></td>
    <td>Create AI Playground for artifactType</td>
</tr>
<tr>
    <td><a href="#update_by_team"><CopyableCode code="update_by_team" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Update AI Playground for artifactType</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Update AI Playground for artifactType</td>
</tr>
<tr>
    <td><a href="#delete_by_team"><CopyableCode code="delete_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Delete AI Playground for artifactType</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Delete AI Playground for artifactType</td>
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

Get AI Playground for artifactType

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
FROM nvidia.private_registry.artifact_specs
WHERE team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
;
```
</TabItem>
<TabItem value="get">

Get AI Playground for artifactType

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
FROM nvidia.private_registry.artifact_specs
WHERE artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create_by_team"
    values={[
        { label: 'create_by_team', value: 'create_by_team' },
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create_by_team">

Create AI Playground for artifactType

```sql
INSERT INTO nvidia.private_registry.artifact_specs (
artifact_name,
attributes,
nvcf_function_id,
nvcf_inference_path,
open_api_spec,
team_name,
artifact_type
)
SELECT 
'{{ artifact_name }}' /* required */,
'{{ attributes }}',
'{{ nvcf_function_id }}' /* required */,
'{{ nvcf_inference_path }}',
'{{ open_api_spec }}',
'{{ team_name }}',
'{{ artifact_type }}'
RETURNING
nvcf_function_id,
artifact_name,
artifact_type,
attributes,
created_date,
namespace,
nvcf_inference_path,
open_api_spec,
updated_date
;
```
</TabItem>
<TabItem value="create">

Create AI Playground for artifactType

```sql
INSERT INTO nvidia.private_registry.artifact_specs (
artifact_name,
attributes,
nvcf_function_id,
nvcf_inference_path,
open_api_spec,
artifact_type
)
SELECT 
'{{ artifact_name }}' /* required */,
'{{ attributes }}',
'{{ nvcf_function_id }}' /* required */,
'{{ nvcf_inference_path }}',
'{{ open_api_spec }}',
'{{ artifact_type }}'
RETURNING
nvcf_function_id,
artifact_name,
artifact_type,
attributes,
created_date,
namespace,
nvcf_inference_path,
open_api_spec,
updated_date
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: artifact_specs
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the artifact_specs resource.
    - name: artifact_type
      value: "{{ artifact_type }}"
      description: Required parameter for the artifact_specs resource.
    - name: artifact_name
      value: "{{ artifact_name }}"
      description: |
        Unique name of the model
    - name: attributes
      value: "{{ attributes }}"
      description: |
        Metadata json string
    - name: nvcf_function_id
      value: "{{ nvcf_function_id }}"
      description: |
        NVCF function id for the model playground
    - name: nvcf_inference_path
      value: "{{ nvcf_inference_path }}"
      description: |
        NVCF inference path (invocation route) for the model playground
    - name: open_api_spec
      value: "{{ open_api_spec }}"
      description: |
        OpenAPI specification for this model
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update_by_team"
    values={[
        { label: 'update_by_team', value: 'update_by_team' },
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update_by_team">

Update AI Playground for artifactType

```sql
UPDATE nvidia.private_registry.artifact_specs
SET 
attributes = '{{ attributes }}',
nvcf_function_id = '{{ nvcf_function_id }}',
nvcf_inference_path = '{{ nvcf_inference_path }}',
open_api_spec = '{{ open_api_spec }}'
WHERE 
team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
RETURNING
nvcf_function_id,
artifact_name,
artifact_type,
attributes,
created_date,
namespace,
nvcf_inference_path,
open_api_spec,
updated_date;
```
</TabItem>
<TabItem value="update">

Update AI Playground for artifactType

```sql
UPDATE nvidia.private_registry.artifact_specs
SET 
attributes = '{{ attributes }}',
nvcf_function_id = '{{ nvcf_function_id }}',
nvcf_inference_path = '{{ nvcf_inference_path }}',
open_api_spec = '{{ open_api_spec }}'
WHERE 
artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
RETURNING
nvcf_function_id,
artifact_name,
artifact_type,
attributes,
created_date,
namespace,
nvcf_inference_path,
open_api_spec,
updated_date;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete_by_team"
    values={[
        { label: 'delete_by_team', value: 'delete_by_team' },
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete_by_team">

Delete AI Playground for artifactType

```sql
DELETE FROM nvidia.private_registry.artifact_specs
WHERE team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="delete">

Delete AI Playground for artifactType

```sql
DELETE FROM nvidia.private_registry.artifact_specs
WHERE artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
</Tabs>
