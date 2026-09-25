--- 
title: authorizations
hide_title: false
hide_table_of_contents: false
keywords:
  - authorizations
  - nvcf_functions
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

Creates, updates, deletes, gets or lists an <code>authorizations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="authorizations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_functions.authorizations" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list_version"
    values={[
        { label: 'list_version', value: 'list_version' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_version">

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
    <td><code>string (uuid)</code></td>
    <td>Function id</td>
</tr>
<tr>
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="authorized_parties" /></td>
    <td><code>array</code></td>
    <td>Authorized parties allowed to invoke the function (wire: authorizedParties)</td>
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
    <td><code>string (uuid)</code></td>
    <td>Function id</td>
</tr>
<tr>
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version id (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="authorized_parties" /></td>
    <td><code>array</code></td>
    <td>Authorized parties allowed to invoke the function (wire: authorizedParties)</td>
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
    <td><a href="#list_version"><CopyableCode code="list_version" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td></td>
    <td>Gets NVIDIA Cloud Account IDs that are authorized to invoke specified function  version. Response includes authorized accounts that were added specifically  at the version level and the authorized accounts that were inherited from  function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a></td>
    <td></td>
    <td>Lists NVIDIA Cloud Account IDs that are authorized to invoke any version of the  specified function. The response includes an array showing authorized accounts  for each version. Individual versions of a function can have their own  authorized accounts. So, each object in the array can have different  authorized accounts listed. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#add_version"><CopyableCode code="add_version" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a>, <a href="#parameter-authorized_party"><code>authorized_party</code></a></td>
    <td></td>
    <td>Adds the specified NVIDIA Cloud Account to the set of authorized accounts that  can invoke the specified function version. If the specified function version  does not have any existing inheritable authorized accounts, it results in a  response with status 404. If the specified account is already in the set of  existing authorized accounts that are directly associated with the function  version, it results in a response wit status code 409. If a function is public,  then Account Admin cannot perform this operation. Note that the response  does not include inherited authorized accounts that were added at the function  level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-authorized_party"><code>authorized_party</code></a></td>
    <td></td>
    <td>Adds the specified NVIDIA Cloud Account to the set of authorized accounts that  are can invoke all the versions of the specified function. If the specified  function does not have any existing inheritable authorized accounts, it results  in a response with status 404. If the specified account is already in the set  of existing inheritable authorized accounts, it results in a response with  status code 409. If a function is public, then Account Admin cannot perform  this operation. Note that response only includes authz accounts at the  function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#set_version"><CopyableCode code="set_version" /></a></td>
    <td><CopyableCode code="replace" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a>, <a href="#parameter-authorized_parties"><code>authorized_parties</code></a></td>
    <td></td>
    <td>Authorizes additional NVIDIA Cloud Accounts to invoke a specific function  version. By default, a function belongs to the NVIDIA Cloud Account that  created it, and the credentials used for function invocation must reference  the same NVIDIA Cloud Account. Upon invocation of this endpoint, any existing  authorized accounts will be overwritten by the newly specified authorized  accounts. Note that the response does NOT include inherited authorized accounts  that were added at the function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#set"><CopyableCode code="set" /></a></td>
    <td><CopyableCode code="replace" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-authorized_parties"><code>authorized_parties</code></a></td>
    <td></td>
    <td>Authorizes additional NVIDIA Cloud Accounts to invoke any version of the  specified function. By default, a function belongs to the NVIDIA Cloud Account  that created it, and the credentials used for function invocation must  reference the same NVIDIA Cloud Account. Upon invocation of this endpoint, any  existing authorized accounts will be overwritten by the newly specified  authorized accounts. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#remove_version"><CopyableCode code="remove_version" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td></td>
    <td>Removes the specified NVIDIA Cloud Account from the set of authorized accounts  that are directly associated with specified function version. If the specified  function version does not have any of its own(not inherited) authorized  accounts, it results in a response with status 404. Also, if the specified  authorized account is not in the set of existing authorized parties that are  directly associated with the specified function version, it results in a  response with status code 404. If the specified function version is public,  then Account Admin cannot perform this operation. Note that the response  does not include inherited authorized accounts that were added at the function  level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a></td>
    <td></td>
    <td>Removes the specified NVIDIA Cloud Account from the set of authorized accounts  that can invoke all the versions of the specified function. If the specified  function does not have any existing inheritable authorized parties, it results  in a response with status 404. Also, if the specified account is not in the  existing set of inheritable authorized accounts, it results in a response with  status 404. If the specified function is public, then Account Admin cannot  perform this operation. Note that response only includes the remaining  authorized accounts at the function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#delete_all"><CopyableCode code="delete_all" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a></td>
    <td></td>
    <td>Deletes authorizations at the function level. This impacts all versions of  the function. If a function versions has its own set of authorizations,  those are not deleted. If the specified function is public, then  Account Admin cannot perform this operation. Note that the response does  not include any authz accounts at version level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
</tr>
<tr>
    <td><a href="#delete_all_version"><CopyableCode code="delete_all_version" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td></td>
    <td>Deletes all the authorized accounts that are directly associated with the  specified function version. Authorized parties that are inherited by the  function version are not deleted. If the specified function version is public,  then Account Admin cannot perform this operation. Note that the response  does not include inherited authorized accounts that were added at the function  level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header </td>
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
<tr id="parameter-function_id">
    <td><CopyableCode code="function_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function id</td>
</tr>
<tr id="parameter-function_version_id">
    <td><CopyableCode code="function_version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Function version</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list_version"
    values={[
        { label: 'list_version', value: 'list_version' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_version">

Gets NVIDIA Cloud Account IDs that are authorized to invoke specified function  version. Response includes authorized accounts that were added specifically  at the version level and the authorized accounts that were inherited from  function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
SELECT
id,
nca_id,
version_id,
authorized_parties
FROM nvidia.nvcf_functions.authorizations
WHERE function_id = '{{ function_id }}' -- required
AND function_version_id = '{{ function_version_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists NVIDIA Cloud Account IDs that are authorized to invoke any version of the  specified function. The response includes an array showing authorized accounts  for each version. Individual versions of a function can have their own  authorized accounts. So, each object in the array can have different  authorized accounts listed. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
SELECT
id,
nca_id,
version_id,
authorized_parties
FROM nvidia.nvcf_functions.authorizations
WHERE function_id = '{{ function_id }}' -- required
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="add_version"
    values={[
        { label: 'add_version', value: 'add_version' },
        { label: 'add', value: 'add' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add_version">

Adds the specified NVIDIA Cloud Account to the set of authorized accounts that  can invoke the specified function version. If the specified function version  does not have any existing inheritable authorized accounts, it results in a  response with status 404. If the specified account is already in the set of  existing authorized accounts that are directly associated with the function  version, it results in a response wit status code 409. If a function is public,  then Account Admin cannot perform this operation. Note that the response  does not include inherited authorized accounts that were added at the function  level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
INSERT INTO nvidia.nvcf_functions.authorizations (
authorized_party,
function_id,
function_version_id
)
SELECT 
'{{ authorized_party }}' /* required */,
'{{ function_id }}',
'{{ function_version_id }}'
RETURNING
function
;
```
</TabItem>
<TabItem value="add">

Adds the specified NVIDIA Cloud Account to the set of authorized accounts that  are can invoke all the versions of the specified function. If the specified  function does not have any existing inheritable authorized accounts, it results  in a response with status 404. If the specified account is already in the set  of existing inheritable authorized accounts, it results in a response with  status code 409. If a function is public, then Account Admin cannot perform  this operation. Note that response only includes authz accounts at the  function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
INSERT INTO nvidia.nvcf_functions.authorizations (
authorized_party,
function_id
)
SELECT 
'{{ authorized_party }}' /* required */,
'{{ function_id }}'
RETURNING
function
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: authorizations
  props:
    - name: function_id
      value: "{{ function_id }}"
      description: Required parameter for the authorizations resource.
    - name: function_version_id
      value: "{{ function_version_id }}"
      description: Required parameter for the authorizations resource.
    - name: authorized_party
      description: |
        Data Transfer Object(DTO) representing an authorized party.
      value:
        clientId: "{{ clientId }}"
        ncaId: "{{ ncaId }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `REPLACE` examples

<Tabs
    defaultValue="set_version"
    values={[
        { label: 'set_version', value: 'set_version' },
        { label: 'set', value: 'set' }
    ]}
>
<TabItem value="set_version">

Authorizes additional NVIDIA Cloud Accounts to invoke a specific function  version. By default, a function belongs to the NVIDIA Cloud Account that  created it, and the credentials used for function invocation must reference  the same NVIDIA Cloud Account. Upon invocation of this endpoint, any existing  authorized accounts will be overwritten by the newly specified authorized  accounts. Note that the response does NOT include inherited authorized accounts  that were added at the function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
REPLACE nvidia.nvcf_functions.authorizations
SET 
authorized_parties = '{{ authorized_parties }}'
WHERE 
function_id = '{{ function_id }}' --required
AND function_version_id = '{{ function_version_id }}' --required
AND authorized_parties = '{{ authorized_parties }}' --required
RETURNING
function;
```
</TabItem>
<TabItem value="set">

Authorizes additional NVIDIA Cloud Accounts to invoke any version of the  specified function. By default, a function belongs to the NVIDIA Cloud Account  that created it, and the credentials used for function invocation must  reference the same NVIDIA Cloud Account. Upon invocation of this endpoint, any  existing authorized accounts will be overwritten by the newly specified  authorized accounts. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
REPLACE nvidia.nvcf_functions.authorizations
SET 
authorized_parties = '{{ authorized_parties }}'
WHERE 
function_id = '{{ function_id }}' --required
AND authorized_parties = '{{ authorized_parties }}' --required
RETURNING
function;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="remove_version"
    values={[
        { label: 'remove_version', value: 'remove_version' },
        { label: 'remove', value: 'remove' }
    ]}
>
<TabItem value="remove_version">

Removes the specified NVIDIA Cloud Account from the set of authorized accounts  that are directly associated with specified function version. If the specified  function version does not have any of its own(not inherited) authorized  accounts, it results in a response with status 404. Also, if the specified  authorized account is not in the set of existing authorized parties that are  directly associated with the specified function version, it results in a  response with status code 404. If the specified function version is public,  then Account Admin cannot perform this operation. Note that the response  does not include inherited authorized accounts that were added at the function  level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
DELETE FROM nvidia.nvcf_functions.authorizations
WHERE function_id = '{{ function_id }}' --required
AND function_version_id = '{{ function_version_id }}' --required
;
```
</TabItem>
<TabItem value="remove">

Removes the specified NVIDIA Cloud Account from the set of authorized accounts  that can invoke all the versions of the specified function. If the specified  function does not have any existing inheritable authorized parties, it results  in a response with status 404. Also, if the specified account is not in the  existing set of inheritable authorized accounts, it results in a response with  status 404. If the specified function is public, then Account Admin cannot  perform this operation. Note that response only includes the remaining  authorized accounts at the function level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
DELETE FROM nvidia.nvcf_functions.authorizations
WHERE function_id = '{{ function_id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="delete_all"
    values={[
        { label: 'delete_all', value: 'delete_all' },
        { label: 'delete_all_version', value: 'delete_all_version' }
    ]}
>
<TabItem value="delete_all">

Deletes authorizations at the function level. This impacts all versions of  the function. If a function versions has its own set of authorizations,  those are not deleted. If the specified function is public, then  Account Admin cannot perform this operation. Note that the response does  not include any authz accounts at version level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
EXEC nvidia.nvcf_functions.authorizations.delete_all 
@function_id='{{ function_id }}' --required
;
```
</TabItem>
<TabItem value="delete_all_version">

Deletes all the authorized accounts that are directly associated with the  specified function version. Authorized parties that are inherited by the  function version are not deleted. If the specified function version is public,  then Account Admin cannot perform this operation. Note that the response  does not include inherited authorized accounts that were added at the function  level. Access to this functionality mandates the inclusion of a bearer token with the  'authorize_clients' scope in the HTTP Authorization header 

```sql
EXEC nvidia.nvcf_functions.authorizations.delete_all_version 
@function_id='{{ function_id }}' --required, 
@function_version_id='{{ function_version_id }}' --required
;
```
</TabItem>
</Tabs>
