--- 
title: artifacts
hide_title: false
hide_table_of_contents: false
keywords:
  - artifacts
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

Creates, updates, deletes, gets or lists an <code>artifacts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="artifacts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.artifacts" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'get', value: 'get' },
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
    <td>Unique name of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the helm chart belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the helm chart belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>Artifact type (MODEL, MODEL_SCRIPT, HELM_CHART, REPOSITORY, COLLECTION, ENDPOINT, BLUEPRINT, PLAYBOOK, AGENT, API, SKILL) (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the artifact</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the helm chart (wire: builtBy)</td>
</tr>
<tr>
    <td><CopyableCode code="can_guest_download" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if a guest user can download (wire: canGuestDownload)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing the explainability for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the artifact has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if helm chart is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this helm chart is publicly accessible (wire: isPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="is_read_only" /></td>
    <td><code>boolean</code></td>
    <td>indicate if current user has read only permissions (deprecated) (wire: isReadOnly)</td>
</tr>
<tr>
    <td><CopyableCode code="labels" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Size of the latest version in bytes (wire: latestVersionSizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="license_terms" /></td>
    <td><code>array</code></td>
    <td> (wire: licenseTerms)</td>
</tr>
<tr>
    <td><CopyableCode code="logo" /></td>
    <td><code>string</code></td>
    <td>URL for the logo image</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>Organization that published this helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the artifact (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the helm chart (wire: shortDescription)</td>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Unique name of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the helm chart belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the helm chart belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>Artifact type (MODEL, MODEL_SCRIPT, HELM_CHART, REPOSITORY, COLLECTION, ENDPOINT, BLUEPRINT, PLAYBOOK, AGENT, API, SKILL) (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the artifact</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the helm chart (wire: builtBy)</td>
</tr>
<tr>
    <td><CopyableCode code="can_guest_download" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if a guest user can download (wire: canGuestDownload)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing the explainability for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the artifact has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if helm chart is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this helm chart is publicly accessible (wire: isPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="is_read_only" /></td>
    <td><code>boolean</code></td>
    <td>indicate if current user has read only permissions (deprecated) (wire: isReadOnly)</td>
</tr>
<tr>
    <td><CopyableCode code="labels" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Size of the latest version in bytes (wire: latestVersionSizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="license_terms" /></td>
    <td><code>array</code></td>
    <td> (wire: licenseTerms)</td>
</tr>
<tr>
    <td><CopyableCode code="logo" /></td>
    <td><code>string</code></td>
    <td>URL for the logo image</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>Organization that published this helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the artifact (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the helm chart (wire: shortDescription)</td>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Unique name of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the helm chart belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the helm chart belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>Artifact type (MODEL, MODEL_SCRIPT, HELM_CHART, REPOSITORY, COLLECTION, ENDPOINT, BLUEPRINT, PLAYBOOK, AGENT, API, SKILL) (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the artifact</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the helm chart (wire: builtBy)</td>
</tr>
<tr>
    <td><CopyableCode code="can_guest_download" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if a guest user can download (wire: canGuestDownload)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing the explainability for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the artifact has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if helm chart is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this helm chart is publicly accessible (wire: isPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="is_read_only" /></td>
    <td><code>boolean</code></td>
    <td>indicate if current user has read only permissions (deprecated) (wire: isReadOnly)</td>
</tr>
<tr>
    <td><CopyableCode code="labels" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Size of the latest version in bytes (wire: latestVersionSizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="license_terms" /></td>
    <td><code>array</code></td>
    <td> (wire: licenseTerms)</td>
</tr>
<tr>
    <td><CopyableCode code="logo" /></td>
    <td><code>string</code></td>
    <td>URL for the logo image</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>Organization that published this helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the artifact (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the helm chart (wire: shortDescription)</td>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Unique name of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the helm chart belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the helm chart belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string</code></td>
    <td>Artifact type (MODEL, MODEL_SCRIPT, HELM_CHART, REPOSITORY, COLLECTION, ENDPOINT, BLUEPRINT, PLAYBOOK, AGENT, API, SKILL) (wire: artifactType)</td>
</tr>
<tr>
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the artifact</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the helm chart (wire: builtBy)</td>
</tr>
<tr>
    <td><CopyableCode code="can_guest_download" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if a guest user can download (wire: canGuestDownload)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing the explainability for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the artifact has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if helm chart is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this helm chart is publicly accessible (wire: isPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="is_read_only" /></td>
    <td><code>boolean</code></td>
    <td>indicate if current user has read only permissions (deprecated) (wire: isReadOnly)</td>
</tr>
<tr>
    <td><CopyableCode code="labels" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Size of the latest version in bytes (wire: latestVersionSizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="license_terms" /></td>
    <td><code>array</code></td>
    <td> (wire: licenseTerms)</td>
</tr>
<tr>
    <td><CopyableCode code="logo" /></td>
    <td><code>string</code></td>
    <td>URL for the logo image</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this artifact</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>Organization that published this helm chart</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the artifact (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the helm chart (wire: shortDescription)</td>
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
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>Get artifact details in team</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List artifacts the user can access in the specified org and team</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>Get artifact details in org</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List artifacts the user can access in the specified org</td>
</tr>
<tr>
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td></td>
    <td>Create artifact in team</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td></td>
    <td>Create artifact in org</td>
</tr>
<tr>
    <td><a href="#update_by_team"><CopyableCode code="update_by_team" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Update artifact details in team</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Update artifact details in org</td>
</tr>
<tr>
    <td><a href="#replace_by_team"><CopyableCode code="replace_by_team" /></a></td>
    <td><CopyableCode code="replace" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Replace artifact details in team</td>
</tr>
<tr>
    <td><a href="#replace"><CopyableCode code="replace" /></a></td>
    <td><CopyableCode code="replace" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Replace artifact details in org</td>
</tr>
<tr>
    <td><a href="#delete_by_team"><CopyableCode code="delete_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Delete artifact in team</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Delete artifact in org</td>
</tr>
<tr>
    <td><a href="#sync_release_type_labels_by_team"><CopyableCode code="sync_release_type_labels_by_team" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Sync release type labels for all collections containing this artifact. Internal API for service-to-service communication.</td>
</tr>
<tr>
    <td><a href="#set_release_type_by_team"><CopyableCode code="set_release_type_by_team" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td></td>
    <td>Updates the release type (for example GA, EA, beta) of an artifact version within the specified organization and optional team.</td>
</tr>
<tr>
    <td><a href="#set_terms_of_service_by_team"><CopyableCode code="set_terms_of_service_by_team" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Update artifact terms of service</td>
</tr>
<tr>
    <td><a href="#sync_release_type_labels"><CopyableCode code="sync_release_type_labels" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Sync release type labels for all collections containing this artifact. Internal API for service-to-service communication.</td>
</tr>
<tr>
    <td><a href="#set_release_type"><CopyableCode code="set_release_type" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td></td>
    <td>Updates the release type (for example GA, EA, beta) of an artifact version within the specified organization and optional team.</td>
</tr>
<tr>
    <td><a href="#set_terms_of_service"><CopyableCode code="set_terms_of_service" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Update artifact terms of service</td>
</tr>
<tr>
    <td><a href="#malware_scan_by_team"><CopyableCode code="malware_scan_by_team" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td><a href="#parameter-contact_email"><code>contact_email</code></a>, <a href="#parameter-nspect_id"><code>nspect_id</code></a></td>
    <td>Initiates malwares can for the artifact</td>
</tr>
<tr>
    <td><a href="#purge_by_team"><CopyableCode code="purge_by_team" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Purge Search DB for deleted artifacts</td>
</tr>
<tr>
    <td><a href="#malware_scan"><CopyableCode code="malware_scan" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td><a href="#parameter-contact_email"><code>contact_email</code></a>, <a href="#parameter-nspect_id"><code>nspect_id</code></a></td>
    <td>Initiates malwares can for the artifact</td>
</tr>
<tr>
    <td><a href="#purge"><CopyableCode code="purge" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Purge Search DB for deleted artifacts</td>
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
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Version ID</td>
</tr>
<tr id="parameter-contact_email">
    <td><CopyableCode code="contact_email" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Contact email</td>
</tr>
<tr id="parameter-nspect_id">
    <td><CopyableCode code="nspect_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Nspect identifier</td>
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
<tr id="parameter-remove_unresolved_labels">
    <td><CopyableCode code="remove_unresolved_labels" /></td>
    <td><code>boolean</code></td>
    <td>Remove unresolved labels</td>
</tr>
<tr id="parameter-resolve_labels">
    <td><CopyableCode code="resolve_labels" /></td>
    <td><code>boolean</code></td>
    <td>Resolve labels</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

Get artifact details in team

```sql
SELECT
name,
encryption_key_id,
latest_version_id,
display_name,
org_name,
owner_name,
team_name,
access_type,
artifact_type,
attributes,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_size_in_bytes,
license_terms,
logo,
policy_labels,
privacy,
product_names,
publisher,
safety_and_security,
short_description,
updated_date
FROM nvidia.private_registry.artifacts
WHERE team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list_by_team">

List artifacts the user can access in the specified org and team

```sql
SELECT
name,
encryption_key_id,
latest_version_id,
display_name,
org_name,
owner_name,
team_name,
access_type,
artifact_type,
attributes,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_size_in_bytes,
license_terms,
logo,
policy_labels,
privacy,
product_names,
publisher,
safety_and_security,
short_description,
updated_date
FROM nvidia.private_registry.artifacts
WHERE team_name = '{{ team_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="get">

Get artifact details in org

```sql
SELECT
name,
encryption_key_id,
latest_version_id,
display_name,
org_name,
owner_name,
team_name,
access_type,
artifact_type,
attributes,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_size_in_bytes,
license_terms,
logo,
policy_labels,
privacy,
product_names,
publisher,
safety_and_security,
short_description,
updated_date
FROM nvidia.private_registry.artifacts
WHERE artifact_type = '{{ artifact_type }}' -- required
AND artifact_name = '{{ artifact_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list">

List artifacts the user can access in the specified org

```sql
SELECT
name,
encryption_key_id,
latest_version_id,
display_name,
org_name,
owner_name,
team_name,
access_type,
artifact_type,
attributes,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_size_in_bytes,
license_terms,
logo,
policy_labels,
privacy,
product_names,
publisher,
safety_and_security,
short_description,
updated_date
FROM nvidia.private_registry.artifacts
WHERE artifact_type = '{{ artifact_type }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
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

Create artifact in team

```sql
INSERT INTO nvidia.private_registry.artifacts (
attributes,
bias,
built_by,
description,
display_name,
explainability,
labels,
labels_v2,
license_terms,
logo,
name,
privacy,
publisher,
safety_and_security,
short_description,
team_name,
artifact_type
)
SELECT 
'{{ attributes }}',
'{{ bias }}',
'{{ built_by }}',
'{{ description }}',
'{{ display_name }}',
'{{ explainability }}',
'{{ labels }}',
'{{ labels_v2 }}',
'{{ license_terms }}',
'{{ logo }}',
'{{ name }}',
'{{ privacy }}',
'{{ publisher }}',
'{{ safety_and_security }}',
'{{ short_description }}',
'{{ team_name }}',
'{{ artifact_type }}'
RETURNING
artifact,
request_status
;
```
</TabItem>
<TabItem value="create">

Create artifact in org

```sql
INSERT INTO nvidia.private_registry.artifacts (
attributes,
bias,
built_by,
description,
display_name,
explainability,
labels,
labels_v2,
license_terms,
logo,
name,
privacy,
publisher,
safety_and_security,
short_description,
artifact_type
)
SELECT 
'{{ attributes }}',
'{{ bias }}',
'{{ built_by }}',
'{{ description }}',
'{{ display_name }}',
'{{ explainability }}',
'{{ labels }}',
'{{ labels_v2 }}',
'{{ license_terms }}',
'{{ logo }}',
'{{ name }}',
'{{ privacy }}',
'{{ publisher }}',
'{{ safety_and_security }}',
'{{ short_description }}',
'{{ artifact_type }}'
RETURNING
artifact,
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: artifacts
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the artifacts resource.
    - name: artifact_type
      value: "{{ artifact_type }}"
      description: Required parameter for the artifacts resource.
    - name: attributes
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: bias
      value: "{{ bias }}"
      description: |
        Text describing bias in the model
    - name: built_by
      value: "{{ built_by }}"
      description: |
        organization that built the artifact
    - name: description
      value: "{{ description }}"
      description: |
        Description of the artifact
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Display name
    - name: explainability
      value: "{{ explainability }}"
      description: |
        Text describing explainability for this model
    - name: labels
      value:
        - "{{ labels }}"
    - name: labels_v2
      value:
        - "{{ labels_v2 }}"
    - name: license_terms
      value:
        - configuredLicenseTerms:
            download:
              artifactType: "{{ artifactType }}"
              generatedHtml: "{{ generatedHtml }}"
              tags:
                - category: "{{ category }}"
                  key: "{{ key }}"
                  label: "{{ label }}"
                  tag: "{{ tag }}"
                  url: "{{ url }}"
            hosting:
              artifactType: "{{ artifactType }}"
              generatedHtml: "{{ generatedHtml }}"
              tags:
                - category: "{{ category }}"
                  key: "{{ key }}"
                  label: "{{ label }}"
                  tag: "{{ tag }}"
                  url: "{{ url }}"
          governingTerms: "{{ governingTerms }}"
          licenseId: "{{ licenseId }}"
          licenseVersion: "{{ licenseVersion }}"
          needsAcceptance: {{ needsAcceptance }}
    - name: logo
      value: "{{ logo }}"
      description: |
        URL for the logo image
    - name: name
      value: "{{ name }}"
      description: |
        Unique name of the artifact
    - name: privacy
      value: "{{ privacy }}"
      description: |
        Text describing the privacy for this model
    - name: publisher
      value: "{{ publisher }}"
      description: |
        organization that published the artifact
    - name: safety_and_security
      value: "{{ safety_and_security }}"
      description: |
        Text for describing the safety and security in the model
    - name: short_description
      value: "{{ short_description }}"
      description: |
        Short description of the artifact
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

Update artifact details in team

```sql
UPDATE nvidia.private_registry.artifacts
SET 
attributes = '{{ attributes }}',
bias = '{{ bias }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
explainability = '{{ explainability }}',
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
privacy = '{{ privacy }}',
publisher = '{{ publisher }}',
safety_and_security = '{{ safety_and_security }}',
short_description = '{{ short_description }}'
WHERE 
team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
RETURNING
artifact,
request_status;
```
</TabItem>
<TabItem value="update">

Update artifact details in org

```sql
UPDATE nvidia.private_registry.artifacts
SET 
attributes = '{{ attributes }}',
bias = '{{ bias }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
explainability = '{{ explainability }}',
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
privacy = '{{ privacy }}',
publisher = '{{ publisher }}',
safety_and_security = '{{ safety_and_security }}',
short_description = '{{ short_description }}'
WHERE 
artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
RETURNING
artifact,
request_status;
```
</TabItem>
</Tabs>


## `REPLACE` examples

<Tabs
    defaultValue="replace_by_team"
    values={[
        { label: 'replace_by_team', value: 'replace_by_team' },
        { label: 'replace', value: 'replace' }
    ]}
>
<TabItem value="replace_by_team">

Replace artifact details in team

```sql
REPLACE nvidia.private_registry.artifacts
SET 
attributes = '{{ attributes }}',
bias = '{{ bias }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
explainability = '{{ explainability }}',
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
privacy = '{{ privacy }}',
publisher = '{{ publisher }}',
safety_and_security = '{{ safety_and_security }}',
short_description = '{{ short_description }}'
WHERE 
team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
RETURNING
artifact,
request_status;
```
</TabItem>
<TabItem value="replace">

Replace artifact details in org

```sql
REPLACE nvidia.private_registry.artifacts
SET 
attributes = '{{ attributes }}',
bias = '{{ bias }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
explainability = '{{ explainability }}',
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
privacy = '{{ privacy }}',
publisher = '{{ publisher }}',
safety_and_security = '{{ safety_and_security }}',
short_description = '{{ short_description }}'
WHERE 
artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
RETURNING
artifact,
request_status;
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

Delete artifact in team

```sql
DELETE FROM nvidia.private_registry.artifacts
WHERE team_name = '{{ team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="delete">

Delete artifact in org

```sql
DELETE FROM nvidia.private_registry.artifacts
WHERE artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="sync_release_type_labels_by_team"
    values={[
        { label: 'sync_release_type_labels_by_team', value: 'sync_release_type_labels_by_team' },
        { label: 'set_release_type_by_team', value: 'set_release_type_by_team' },
        { label: 'set_terms_of_service_by_team', value: 'set_terms_of_service_by_team' },
        { label: 'sync_release_type_labels', value: 'sync_release_type_labels' },
        { label: 'set_release_type', value: 'set_release_type' },
        { label: 'set_terms_of_service', value: 'set_terms_of_service' },
        { label: 'malware_scan_by_team', value: 'malware_scan_by_team' },
        { label: 'purge_by_team', value: 'purge_by_team' },
        { label: 'malware_scan', value: 'malware_scan' },
        { label: 'purge', value: 'purge' }
    ]}
>
<TabItem value="sync_release_type_labels_by_team">

Sync release type labels for all collections containing this artifact. Internal API for service-to-service communication.

```sql
EXEC nvidia.private_registry.artifacts.sync_release_type_labels_by_team 
@team_name='{{ team_name }}' --required, 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="set_release_type_by_team">

Updates the release type (for example GA, EA, beta) of an artifact version within the specified organization and optional team.

```sql
EXEC nvidia.private_registry.artifacts.set_release_type_by_team 
@team_name='{{ team_name }}' --required, 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required 
@@json=
'{
"releaseType": "{{ releaseType }}", 
"version": "{{ version }}"
}'
;
```
</TabItem>
<TabItem value="set_terms_of_service_by_team">

Update artifact terms of service

```sql
EXEC nvidia.private_registry.artifacts.set_terms_of_service_by_team 
@team_name='{{ team_name }}' --required, 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required 
@@json=
'{
"accessType": "{{ accessType }}", 
"canGuestPull": {{ canGuestPull }}, 
"canPublicList": {{ canPublicList }}, 
"isPublic": {{ isPublic }}, 
"licenseTerms": "{{ licenseTerms }}", 
"productNames": "{{ productNames }}"
}'
;
```
</TabItem>
<TabItem value="sync_release_type_labels">

Sync release type labels for all collections containing this artifact. Internal API for service-to-service communication.

```sql
EXEC nvidia.private_registry.artifacts.sync_release_type_labels 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="set_release_type">

Updates the release type (for example GA, EA, beta) of an artifact version within the specified organization and optional team.

```sql
EXEC nvidia.private_registry.artifacts.set_release_type 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required 
@@json=
'{
"releaseType": "{{ releaseType }}", 
"version": "{{ version }}"
}'
;
```
</TabItem>
<TabItem value="set_terms_of_service">

Update artifact terms of service

```sql
EXEC nvidia.private_registry.artifacts.set_terms_of_service 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required 
@@json=
'{
"accessType": "{{ accessType }}", 
"canGuestPull": {{ canGuestPull }}, 
"canPublicList": {{ canPublicList }}, 
"isPublic": {{ isPublic }}, 
"licenseTerms": "{{ licenseTerms }}", 
"productNames": "{{ productNames }}"
}'
;
```
</TabItem>
<TabItem value="malware_scan_by_team">

Initiates malwares can for the artifact

```sql
EXEC nvidia.private_registry.artifacts.malware_scan_by_team 
@team_name='{{ team_name }}' --required, 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required, 
@version_id='{{ version_id }}' --required, 
@contact-email='{{ contact_email }}', 
@nspect-id='{{ nspect_id }}'
;
```
</TabItem>
<TabItem value="purge_by_team">

Purge Search DB for deleted artifacts

```sql
EXEC nvidia.private_registry.artifacts.purge_by_team 
@team_name='{{ team_name }}' --required, 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="malware_scan">

Initiates malwares can for the artifact

```sql
EXEC nvidia.private_registry.artifacts.malware_scan 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required, 
@version_id='{{ version_id }}' --required, 
@contact-email='{{ contact_email }}', 
@nspect-id='{{ nspect_id }}'
;
```
</TabItem>
<TabItem value="purge">

Purge Search DB for deleted artifacts

```sql
EXEC nvidia.private_registry.artifacts.purge 
@artifact_type='{{ artifact_type }}' --required, 
@artifact_name='{{ artifact_name }}' --required
;
```
</TabItem>
</Tabs>
