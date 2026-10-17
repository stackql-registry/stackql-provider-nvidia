--- 
title: current_user
hide_title: false
hide_table_of_contents: false
keywords:
  - current_user
  - orgs
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

Creates, updates, deletes, gets or lists a <code>current_user</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="current_user" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.orgs.current_user" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>unique Id of this user.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>user name</td>
</tr>
<tr>
    <td><CopyableCode code="client_id" /></td>
    <td><code>string</code></td>
    <td>unique auth client id of this user. (wire: clientId)</td>
</tr>
<tr>
    <td><CopyableCode code="starfleet_id" /></td>
    <td><code>string</code></td>
    <td>unique starfleet id of this user. (wire: starfleetId)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Created date for this user (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td>Email address of the user. This should be unique.</td>
</tr>
<tr>
    <td><CopyableCode code="first_login_date" /></td>
    <td><code>string</code></td>
    <td>Last time the user logged in (wire: firstLoginDate)</td>
</tr>
<tr>
    <td><CopyableCode code="has_beta_access" /></td>
    <td><code>boolean</code></td>
    <td>Determines if the user has beta access (wire: hasBetaAccess)</td>
</tr>
<tr>
    <td><CopyableCode code="has_profile" /></td>
    <td><code>boolean</code></td>
    <td>indicate if user profile has been completed. (wire: hasProfile)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_ai_foundry_partnerships_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted AI Foundry Partnerships eula (wire: hasSignedAiFoundryPartnershipsEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_aodteula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted AODT End User License Agreement. (wire: hasSignedAODTEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_base_command_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted Base Command End User License Agreement. (wire: hasSignedBaseCommandEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_base_command_manager_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted Base Command Manager End User License Agreement. (wire: hasSignedBaseCommandManagerEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_bio_ne_mo_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted BioNeMo End User License Agreement. (wire: hasSignedBioNeMoEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_container_publishing_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted container publishing eula (wire: hasSignedContainerPublishingEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_cu_opt_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted CuOpt eula (wire: hasSignedCuOptEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_earth_2_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted Earth-2 eula (wire: hasSignedEarth2EULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_egx_eula" /></td>
    <td><code>boolean</code></td>
    <td>&#91;Deprecated&#93; indicates if user has accepted EGX End User License Agreement. (wire: hasSignedEgxEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_eula" /></td>
    <td><code>boolean</code></td>
    <td>Determines if the user has signed the NGC End User License Agreement. (wire: hasSignedEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_fleet_command_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted Fleet Command End User License Agreement. (wire: hasSignedFleetCommandEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_llm_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted LLM End User License Agreement. (wire: hasSignedLlmEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_nvaieeula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted Fleet Command End User License Agreement. (wire: hasSignedNVAIEEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_nvidia_eula" /></td>
    <td><code>boolean</code></td>
    <td>Determines if the user has signed the NVIDIA End User License Agreement. (wire: hasSignedNvidiaEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_nvqceula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted Nvidia Quantum Cloud End User License Agreement. (wire: hasSignedNVQCEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_omniverse_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has accepted Omniverse End User License Agreement. (wire: hasSignedOmniverseEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_privacy_policy" /></td>
    <td><code>boolean</code></td>
    <td>Determines if the user has signed the Privacy Policy. (wire: hasSignedPrivacyPolicy)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_third_party_registry_share_eula" /></td>
    <td><code>boolean</code></td>
    <td>indicates if user has consented to share their registration info with other parties (wire: hasSignedThirdPartyRegistryShareEULA)</td>
</tr>
<tr>
    <td><CopyableCode code="has_subscribed_to_email" /></td>
    <td><code>boolean</code></td>
    <td>Determines if the user has opted in email subscription. (wire: hasSubscribedToEmail)</td>
</tr>
<tr>
    <td><CopyableCode code="idp_type" /></td>
    <td><code>string</code></td>
    <td>Type of IDP, Identity Provider. Used for login. (NVIDIA, ENTERPRISE) (wire: idpType)</td>
</tr>
<tr>
    <td><CopyableCode code="is_active" /></td>
    <td><code>boolean</code></td>
    <td>Determines if the user is active or not. (wire: isActive)</td>
</tr>
<tr>
    <td><CopyableCode code="is_deleted" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if user was deleted from the system. (wire: isDeleted)</td>
</tr>
<tr>
    <td><CopyableCode code="is_saml" /></td>
    <td><code>boolean</code></td>
    <td>Determines if the user is a SAML account or not. (wire: isSAML)</td>
</tr>
<tr>
    <td><CopyableCode code="job_position_title" /></td>
    <td><code>string</code></td>
    <td>Title of user's job position. (wire: jobPositionTitle)</td>
</tr>
<tr>
    <td><CopyableCode code="last_login_date" /></td>
    <td><code>string</code></td>
    <td>Last time the user logged in (wire: lastLoginDate)</td>
</tr>
<tr>
    <td><CopyableCode code="roles" /></td>
    <td><code>array</code></td>
    <td>List of roles that the user have</td>
</tr>
<tr>
    <td><CopyableCode code="storage_quota" /></td>
    <td><code>array</code></td>
    <td>Storage quota for this user. (wire: storageQuota)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date for this user (wire: updatedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="user_metadata" /></td>
    <td><code>object</code></td>
    <td>Metadata information about the user. (wire: userMetadata)</td>
</tr>
<tr>
    <td><CopyableCode code="verified" /></td>
    <td><code>boolean</code></td>
    <td>Is user's email or phone number is verified</td>
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
    <td></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a></td>
    <td>What am I?</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td></td>
    <td></td>
    <td>Edit current user profile</td>
</tr>
<tr>
    <td><a href="#create_api_key"><CopyableCode code="create_api_key" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td></td>
    <td></td>
    <td>Generate API Key</td>
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
<tr id="parameter-org_name">
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

What am I?

```sql
SELECT
id,
name,
client_id,
starfleet_id,
created_date,
email,
first_login_date,
has_beta_access,
has_profile,
has_signed_ai_foundry_partnerships_eula,
has_signed_aodteula,
has_signed_base_command_eula,
has_signed_base_command_manager_eula,
has_signed_bio_ne_mo_eula,
has_signed_container_publishing_eula,
has_signed_cu_opt_eula,
has_signed_earth_2_eula,
has_signed_egx_eula,
has_signed_eula,
has_signed_fleet_command_eula,
has_signed_llm_eula,
has_signed_nvaieeula,
has_signed_nvidia_eula,
has_signed_nvqceula,
has_signed_omniverse_eula,
has_signed_privacy_policy,
has_signed_third_party_registry_share_eula,
has_subscribed_to_email,
idp_type,
is_active,
is_deleted,
is_saml,
job_position_title,
last_login_date,
roles,
storage_quota,
updated_date,
user_metadata,
verified
FROM nvidia.orgs.current_user
WHERE org_name = '{{ org_name }}'
;
```
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

Edit current user profile

```sql
UPDATE nvidia.orgs.current_user
SET 
has_email_opt_in = {{ has_email_opt_in }},
has_signed_aodteula = {{ has_signed_aodteula }},
has_signed_ai_foundry_partnerships_eula = {{ has_signed_ai_foundry_partnerships_eula }},
has_signed_base_command_eula = {{ has_signed_base_command_eula }},
has_signed_base_command_manager_eula = {{ has_signed_base_command_manager_eula }},
has_signed_bio_ne_mo_eula = {{ has_signed_bio_ne_mo_eula }},
has_signed_container_publishing_eula = {{ has_signed_container_publishing_eula }},
has_signed_cu_opt_eula = {{ has_signed_cu_opt_eula }},
has_signed_eula = {{ has_signed_eula }},
has_signed_earth_2_eula = {{ has_signed_earth_2_eula }},
has_signed_egx_eula = {{ has_signed_egx_eula }},
has_signed_fleet_command_eula = {{ has_signed_fleet_command_eula }},
has_signed_llm_eula = {{ has_signed_llm_eula }},
has_signed_nvaieeula = {{ has_signed_nvaieeula }},
has_signed_nvqceula = {{ has_signed_nvqceula }},
has_signed_nvidia_eula = {{ has_signed_nvidia_eula }},
has_signed_omniverse_eula = {{ has_signed_omniverse_eula }},
has_signed_privacy_policy = {{ has_signed_privacy_policy }},
has_signed_third_party_registry_share_eula = {{ has_signed_third_party_registry_share_eula }},
name = '{{ name }}',
user_metadata = '{{ user_metadata }}'
RETURNING
activation_token,
nca_role,
request_status,
user,
user_roles;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="create_api_key"
    values={[
        { label: 'create_api_key', value: 'create_api_key' }
    ]}
>
<TabItem value="create_api_key">

Generate API Key

```sql
EXEC nvidia.orgs.current_user.create_api_key 

;
```
</TabItem>
</Tabs>
