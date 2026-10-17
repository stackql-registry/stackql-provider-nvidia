--- 
title: registry_credentials
hide_title: false
hide_table_of_contents: false
keywords:
  - registry_credentials
  - nvcf_deployments
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

Creates, updates, deletes, gets or lists a <code>registry_credentials</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="registry_credentials" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_deployments.registry_credentials" /></td></tr>
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
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id owning the Registry Credential (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_credential_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Registry Credential Id (wire: registryCredentialId)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_credential_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry Credential name (wire: registryCredentialName)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Recognized registry name (wire: registryName)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_types" /></td>
    <td><code>array</code></td>
    <td>Registry type (wire: artifactTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Timestamp for registry credential creation (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry credential description</td>
</tr>
<tr>
    <td><CopyableCode code="key_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Optional registry credential key type (wire: keyType)</td>
</tr>
<tr>
    <td><CopyableCode code="last_updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Timestamp for last registry credential update (wire: lastUpdatedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="provisioned_by" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry credential provisioned by system or user (SYSTEM, USER) (wire: provisionedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_hostname" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry hostname (wire: registryHostname)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Optional set of tags</td>
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
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id owning the Registry Credential (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_credential_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Registry Credential Id (wire: registryCredentialId)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_credential_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry Credential name (wire: registryCredentialName)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Recognized registry name (wire: registryName)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_types" /></td>
    <td><code>array</code></td>
    <td>Registry type (wire: artifactTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Timestamp for registry credential creation (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry credential description</td>
</tr>
<tr>
    <td><CopyableCode code="key_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Optional registry credential key type (wire: keyType)</td>
</tr>
<tr>
    <td><CopyableCode code="last_updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Timestamp for last registry credential update (wire: lastUpdatedAt)</td>
</tr>
<tr>
    <td><CopyableCode code="provisioned_by" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry credential provisioned by system or user (SYSTEM, USER) (wire: provisionedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="registry_hostname" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Registry hostname (wire: registryHostname)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Optional set of tags</td>
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
    <td><a href="#parameter-registry_credential_id"><code>registry_credential_id</code></a></td>
    <td></td>
    <td>Retrieves detailed information of the specified registry credential  associated with the authenticated NVIDIA Cloud Account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. </td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-provisioned_by"><code>provisioned_by</code></a></td>
    <td>Lists all the registry credentials associated with the authenticated  NVIDIA Cloud Account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. </td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-artifact_types"><code>artifact_types</code></a>, <a href="#parameter-registry_hostname"><code>registry_hostname</code></a>, <a href="#parameter-secret"><code>secret</code></a></td>
    <td></td>
    <td>Adds a new registry credential to the account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. </td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-registry_credential_id"><code>registry_credential_id</code></a></td>
    <td></td>
    <td>Updates the secret and/or the artifact types associated with the specified  registry credential. Artifact types specified in the request body are  added to the set of artifact types that already exist for the specified  registry credential. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. </td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-registry_credential_id"><code>registry_credential_id</code></a></td>
    <td></td>
    <td>Deletes the specified registry credential associated with the authenticated  NVIDIA Cloud Account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. </td>
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
<tr id="parameter-registry_credential_id">
    <td><CopyableCode code="registry_credential_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Registry Credential id</td>
</tr>
<tr id="parameter-artifact_type">
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>array</code></td>
    <td>Filters registry credentials using the specified 'artifactType' query param.  (wire: artifactType)</td>
</tr>
<tr id="parameter-provisioned_by">
    <td><CopyableCode code="provisioned_by" /></td>
    <td><code>array</code></td>
    <td>Filters registry credentials using the specified 'provisionedBy' query param.  (wire: provisionedBy)</td>
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

Retrieves detailed information of the specified registry credential  associated with the authenticated NVIDIA Cloud Account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. 

```sql
SELECT
nca_id,
registry_credential_id,
registry_credential_name,
registry_name,
artifact_types,
created_at,
description,
key_type,
last_updated_at,
provisioned_by,
registry_hostname,
tags
FROM nvidia.nvcf_deployments.registry_credentials
WHERE registry_credential_id = '{{ registry_credential_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists all the registry credentials associated with the authenticated  NVIDIA Cloud Account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. 

```sql
SELECT
nca_id,
registry_credential_id,
registry_credential_name,
registry_name,
artifact_types,
created_at,
description,
key_type,
last_updated_at,
provisioned_by,
registry_hostname,
tags
FROM nvidia.nvcf_deployments.registry_credentials
WHERE artifact_type = '{{ artifact_type }}'
AND provisioned_by = '{{ provisioned_by }}'
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

Adds a new registry credential to the account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. 

```sql
INSERT INTO nvidia.nvcf_deployments.registry_credentials (
artifact_types,
description,
registry_hostname,
secret,
tags
)
SELECT 
'{{ artifact_types }}' /* required */,
'{{ description }}',
'{{ registry_hostname }}' /* required */,
'{{ secret }}' /* required */,
'{{ tags }}'
RETURNING
registry_credential
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: registry_credentials
  props:
    - name: artifact_types
      value:
        - "{{ artifact_types }}"
      description: |
        Artifact types that can be retrieved using this credential
    - name: description
      value: "{{ description }}"
      description: |
        Optional registry credential description
    - name: registry_hostname
      value: "{{ registry_hostname }}"
      description: |
        Registry hostname
    - name: secret
      description: |
        Registry credential - secret value must be base64 encoded string in username:password format
      value:
        name: "{{ name }}"
        value: "{{ value }}"
    - name: tags
      value:
        - "{{ tags }}"
      description: |
        Optional set of tags
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

Updates the secret and/or the artifact types associated with the specified  registry credential. Artifact types specified in the request body are  added to the set of artifact types that already exist for the specified  registry credential. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. 

```sql
UPDATE nvidia.nvcf_deployments.registry_credentials
SET 
artifact_type_enums = '{{ artifact_type_enums }}',
secret = '{{ secret }}'
WHERE 
registry_credential_id = '{{ registry_credential_id }}' --required
RETURNING
registry_credential;
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

Deletes the specified registry credential associated with the authenticated  NVIDIA Cloud Account. Requires a bearer token in the HTTP Authorization header with 'manage_registries' scope. 

```sql
DELETE FROM nvidia.nvcf_deployments.registry_credentials
WHERE registry_credential_id = '{{ registry_credential_id }}' --required
;
```
</TabItem>
</Tabs>
