--- 
title: license_acceptances
hide_title: false
hide_table_of_contents: false
keywords:
  - license_acceptances
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

Creates, updates, deletes, gets or lists a <code>license_acceptances</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="license_acceptances" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.license_acceptances" /></td></tr>
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
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-license_id"><code>license_id</code></a>, <a href="#parameter-license_version"><code>license_version</code></a></td>
    <td></td>
    <td>Record license acceptance for an org artifact.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-license_id"><code>license_id</code></a>, <a href="#parameter-license_version"><code>license_version</code></a></td>
    <td></td>
    <td>Record license acceptance for an org artifact.</td>
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
</tbody>
</table>

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

Record license acceptance for an org artifact.

```sql
INSERT INTO nvidia.private_registry.license_acceptances (
license_id,
license_version,
team_name,
artifact_type,
artifact_name
)
SELECT 
'{{ license_id }}' /* required */,
'{{ license_version }}' /* required */,
'{{ team_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="create">

Record license acceptance for an org artifact.

```sql
INSERT INTO nvidia.private_registry.license_acceptances (
license_id,
license_version,
artifact_type,
artifact_name
)
SELECT 
'{{ license_id }}' /* required */,
'{{ license_version }}' /* required */,
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: license_acceptances
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the license_acceptances resource.
    - name: artifact_type
      value: "{{ artifact_type }}"
      description: Required parameter for the license_acceptances resource.
    - name: artifact_name
      value: "{{ artifact_name }}"
      description: Required parameter for the license_acceptances resource.
    - name: license_id
      value: "{{ license_id }}"
      description: |
        License identifier to accept (must match a licenseId from the artifact's published licenseTerms).
    - name: license_version
      value: "{{ license_version }}"
      description: |
        License version to accept (must match licenseVersion for that license on the artifact).
`}</CodeBlock>

</TabItem>
</Tabs>
