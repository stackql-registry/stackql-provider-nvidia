--- 
title: encryption_keys
hide_title: false
hide_table_of_contents: false
keywords:
  - encryption_keys
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

Creates, updates, deletes, gets or lists an <code>encryption_keys</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="encryption_keys" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.encryption_keys" /></td></tr>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the artifact</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name of the artifact (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>Artifact type (MODEL, MODEL_SCRIPT, HELM_CHART, REPOSITORY, COLLECTION, ENDPOINT, BLUEPRINT, PLAYBOOK, AGENT, API, SKILL) (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the artifact</td>
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
    <td>Name of the artifact</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name of the artifact (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>Artifact type (MODEL, MODEL_SCRIPT, HELM_CHART, REPOSITORY, COLLECTION, ENDPOINT, BLUEPRINT, PLAYBOOK, AGENT, API, SKILL) (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the artifact</td>
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
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string (regex)</code></td>
    <td>The encryption key identifier in UUID format. (example: 196afcf4-d6c8-4116-aa25-34a718a14f43, pattern: &lt;code&gt;^&#91;0-9a-f&#93;&#123;8&#125;-&#91;0-9a-f&#93;&#123;4&#125;-&#91;0-9a-f&#93;&#123;4&#125;-&#91;0-9a-f&#93;&#123;4&#125;-&#91;0-9a-f&#93;&#123;12&#125;$&lt;/code&gt;) (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (regex)</code></td>
    <td>The creation timestamp of the key item in ISO-8601 format. Format: YYYY-MM-DDTHH:mm:ss.sssZ. (example: 2025-04-19T22:30:00.123Z, pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the encryption key</td>
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
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string (regex)</code></td>
    <td>The encryption key identifier in UUID format. (example: 196afcf4-d6c8-4116-aa25-34a718a14f43, pattern: &lt;code&gt;^&#91;0-9a-f&#93;&#123;8&#125;-&#91;0-9a-f&#93;&#123;4&#125;-&#91;0-9a-f&#93;&#123;4&#125;-&#91;0-9a-f&#93;&#123;4&#125;-&#91;0-9a-f&#93;&#123;12&#125;$&lt;/code&gt;) (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (regex)</code></td>
    <td>The creation timestamp of the key item in ISO-8601 format. Format: YYYY-MM-DDTHH:mm:ss.sssZ. (example: 2025-04-19T22:30:00.123Z, pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the encryption key</td>
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
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-key_id"><code>key_id</code></a></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td>List artifacts for encryption key in org/team</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-key_id"><code>key_id</code></a></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td>List artifacts for encryption key in org</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td></td>
    <td>List encryption keys in org/team</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td></td>
    <td>List encryption keys in org</td>
</tr>
<tr>
    <td><a href="#delete_by_team"><CopyableCode code="delete_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-key_id"><code>key_id</code></a></td>
    <td></td>
    <td>Revoke encryption key and disassociate from all artifacts in org/team</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-key_id"><code>key_id</code></a></td>
    <td></td>
    <td>Revoke encryption key and disassociate from all artifacts in org</td>
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
<tr id="parameter-key_id">
    <td><CopyableCode code="key_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Key ID</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
<tr id="parameter-artifact_type">
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact type</td>
</tr>
<tr id="parameter-artifact_type">
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact type (wire: artifactType)</td>
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

List artifacts for encryption key in org/team

```sql
SELECT
name,
display_name,
artifact_type,
description
FROM nvidia.private_registry.encryption_keys
WHERE team_name = '{{ team_name }}' -- required
AND key_id = '{{ key_id }}' -- required
AND artifact_type = '{{ artifact_type }}'
;
```
</TabItem>
<TabItem value="get">

List artifacts for encryption key in org

```sql
SELECT
name,
display_name,
artifact_type,
description
FROM nvidia.private_registry.encryption_keys
WHERE key_id = '{{ key_id }}' -- required
AND artifact_type = '{{ artifact_type }}'
;
```
</TabItem>
<TabItem value="list_by_team">

List encryption keys in org/team

```sql
SELECT
encryption_key_id,
created,
description
FROM nvidia.private_registry.encryption_keys
WHERE team_name = '{{ team_name }}' -- required
;
```
</TabItem>
<TabItem value="list">

List encryption keys in org

```sql
SELECT
encryption_key_id,
created,
description
FROM nvidia.private_registry.encryption_keys
;
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

Revoke encryption key and disassociate from all artifacts in org/team

```sql
DELETE FROM nvidia.private_registry.encryption_keys
WHERE team_name = '{{ team_name }}' --required
AND key_id = '{{ key_id }}' --required
;
```
</TabItem>
<TabItem value="delete">

Revoke encryption key and disassociate from all artifacts in org

```sql
DELETE FROM nvidia.private_registry.encryption_keys
WHERE key_id = '{{ key_id }}' --required
;
```
</TabItem>
</Tabs>
