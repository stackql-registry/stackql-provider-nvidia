--- 
title: nim_metadata
hide_title: false
hide_table_of_contents: false
keywords:
  - nim_metadata
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

Creates, updates, deletes, gets or lists a <code>nim_metadata</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="nim_metadata" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.nim_metadata" /></td></tr>
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
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team"><code>team</code></a>, <a href="#parameter-nim_name"><code>nim_name</code></a>, <a href="#parameter-tag"><code>tag</code></a></td>
    <td></td>
    <td>Registers NIM profile metadata for the given team, NIM name, and tag. This is a placeholder that validates the supplied profiles and echoes the provided fields back to the caller.&lt;br /&gt;SSA: requires the following scope `createNimMetadata`&lt;br /&gt;</td>
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
<tr id="parameter-nim_name">
    <td><CopyableCode code="nim_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NIM name</td>
</tr>
<tr id="parameter-tag">
    <td><CopyableCode code="tag" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NIM tag</td>
</tr>
<tr id="parameter-team">
    <td><CopyableCode code="team" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Registers NIM profile metadata for the given team, NIM name, and tag. This is a placeholder that validates the supplied profiles and echoes the provided fields back to the caller.&lt;br /&gt;SSA: requires the following scope `createNimMetadata`&lt;br /&gt;

```sql
INSERT INTO nvidia.catalog.nim_metadata (
profiles,
team,
nim_name,
tag
)
SELECT 
'{{ profiles }}',
'{{ team }}',
'{{ nim_name }}',
'{{ tag }}'
RETURNING
profiles
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: nim_metadata
  props:
    - name: team
      value: "{{ team }}"
      description: Required parameter for the nim_metadata resource.
    - name: nim_name
      value: "{{ nim_name }}"
      description: Required parameter for the nim_metadata resource.
    - name: tag
      value: "{{ tag }}"
      description: Required parameter for the nim_metadata resource.
    - name: profiles
      value:
        - buildable_profile: {{ buildable_profile }}
          checksum: "{{ checksum }}"
          feat_lora: {{ feat_lora }}
          form_factor: "{{ form_factor }}"
          gpu: "{{ gpu }}"
          gpu_device: "{{ gpu_device }}"
          inference_backend: "{{ inference_backend }}"
          latency: "{{ latency }}"
          min_vram_per_device_gb: {{ min_vram_per_device_gb }}
          pipeline_parallel_size: {{ pipeline_parallel_size }}
          precision: "{{ precision }}"
          profile_id: "{{ profile_id }}"
          tensor_parallel_size: {{ tensor_parallel_size }}
          workspace_hash: "{{ workspace_hash }}"
`}</CodeBlock>

</TabItem>
</Tabs>
