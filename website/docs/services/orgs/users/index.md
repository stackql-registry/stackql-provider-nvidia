--- 
title: users
hide_title: false
hide_table_of_contents: false
keywords:
  - users
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

Creates, updates, deletes, gets or lists a <code>users</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="users" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.orgs.users" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_starfleet_id"
    values={[
        { label: 'get_by_starfleet_id', value: 'get_by_starfleet_id' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_starfleet_id">

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
    <td><a href="#get_by_starfleet_id"><CopyableCode code="get_by_starfleet_id" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-starfleet_id"><code>starfleet_id</code></a></td>
    <td></td>
    <td>Get User details in org by starfleet Id</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-user_email_or_id"><code>user_email_or_id</code></a></td>
    <td></td>
    <td>Get info and role/invitation in an org by email or id</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-exclude_from_team"><code>exclude_from_team</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-q"><code>q</code></a></td>
    <td>Get list of users in organization. (User Admin in org privileges required)</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-email"><code>email</code></a></td>
    <td><a href="#parameter-send_email"><code>send_email</code></a>, <a href="#parameter-idp_id"><code>idp_id</code></a></td>
    <td>Creates a User</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-anonymize"><code>anonymize</code></a></td>
    <td>Remove User from org.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-starfleet_id">
    <td><CopyableCode code="starfleet_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-user_email_or_id">
    <td><CopyableCode code="user_email_or_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-anonymize">
    <td><CopyableCode code="anonymize" /></td>
    <td><code>boolean</code></td>
    <td>If anonymize is true, then org owner permission is required.</td>
</tr>
<tr id="parameter-exclude_from_team">
    <td><CopyableCode code="exclude_from_team" /></td>
    <td><code>string</code></td>
    <td>Name of team to exclude members from</td>
</tr>
<tr id="parameter-idp_id">
    <td><CopyableCode code="idp_id" /></td>
    <td><code>string</code></td>
    <td>If the IDP ID is provided then it is used instead of the one configured for the organization</td>
</tr>
<tr id="parameter-page_number">
    <td><CopyableCode code="page_number" /></td>
    <td><code>integer (int32)</code></td>
    <td>The page number of result</td>
</tr>
<tr id="parameter-page_size">
    <td><CopyableCode code="page_size" /></td>
    <td><code>integer (int32)</code></td>
    <td>The page size of result</td>
</tr>
<tr id="parameter-q">
    <td><CopyableCode code="q" /></td>
    <td><code>object</code></td>
    <td>User Search Parameters. Only 'filters' and 'orderBy' for 'name' and 'email' are implemented</td>
</tr>
<tr id="parameter-send_email">
    <td><CopyableCode code="send_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_starfleet_id"
    values={[
        { label: 'get_by_starfleet_id', value: 'get_by_starfleet_id' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_starfleet_id">

Get User details in org by starfleet Id

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
FROM nvidia.orgs.users
WHERE starfleet_id = '{{ starfleet_id }}' -- required
;
```
</TabItem>
<TabItem value="get">

Get info and role/invitation in an org by email or id

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
FROM nvidia.orgs.users
WHERE user_email_or_id = '{{ user_email_or_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Get list of users in organization. (User Admin in org privileges required)

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
FROM nvidia.orgs.users
WHERE exclude_from_team = '{{ exclude_from_team }}'
AND page_number = '{{ page_number }}'
AND page_size = '{{ page_size }}'
AND q = '{{ q }}'
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

Creates a User

```sql
INSERT INTO nvidia.orgs.users (
email,
email_opt_in,
eula_accepted,
name,
role_type,
role_types,
salesforce_contact_job_role,
user_metadata,
send_email,
idp_id
)
SELECT 
'{{ email }}' /* required */,
{{ email_opt_in }},
{{ eula_accepted }},
'{{ name }}',
'{{ role_type }}',
'{{ role_types }}',
'{{ salesforce_contact_job_role }}',
'{{ user_metadata }}',
'{{ send_email }}',
'{{ idp_id }}'
RETURNING
activation_token,
nca_role,
request_status,
user,
user_roles
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: users
  props:
    - name: email
      value: "{{ email }}"
      description: |
        Email address of the user. This should be unique.
    - name: email_opt_in
      value: {{ email_opt_in }}
      description: |
        indicates if user has opt in to nvidia emails
    - name: eula_accepted
      value: {{ eula_accepted }}
      description: |
        indicates if user has accepted EULA
    - name: name
      value: "{{ name }}"
      description: |
        user name
    - name: role_type
      value: "{{ role_type }}"
      description: |
        DEPRECATED - use roleTypes which allows multiple roles
    - name: role_types
      value:
        - "{{ role_types }}"
      description: |
        feature roles to give to the user
    - name: salesforce_contact_job_role
      value: "{{ salesforce_contact_job_role }}"
      description: |
        user job role
    - name: user_metadata
      description: |
        Metadata information about the user.
      value:
        company: "{{ company }}"
        companyUrl: "{{ companyUrl }}"
        country: "{{ country }}"
        firstName: "{{ firstName }}"
        industry: "{{ industry }}"
        interest:
          - "{{ interest }}"
        lastName: "{{ lastName }}"
        role: "{{ role }}"
    - name: send_email
      value: {{ send_email }}
    - name: idp_id
      value: "{{ idp_id }}"
      description: If the IDP ID is provided then it is used instead of the one configured for the organization
      description: If the IDP ID is provided then it is used instead of the one configured for the organization
`}</CodeBlock>

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

Remove User from org.

```sql
DELETE FROM nvidia.orgs.users
WHERE id = '{{ id }}' --required
AND anonymize = '{{ anonymize }}'
;
```
</TabItem>
</Tabs>
