--- 
title: models
hide_title: false
hide_table_of_contents: false
keywords:
  - models
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

Creates, updates, deletes, gets or lists a <code>models</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="models" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.models" /></td></tr>
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
    <td>Unique name of the model</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Deprecated: Please use latestVersionIdStr instead. ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the model belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of model's owner (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the model belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td>Application of the model</td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the model</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>organization that built the repository (wire: builtBy)</td>
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
    <td>Description of the model</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing explainability for this model</td>
</tr>
<tr>
    <td><CopyableCode code="framework" /></td>
    <td><code>string</code></td>
    <td>Framework used to train this model</td>
</tr>
<tr>
    <td><CopyableCode code="has_playground" /></td>
    <td><code>boolean</code></td>
    <td>indicate if the Model has AI Playground configured (wire: hasPlayground)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the model has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if model is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_playground_enabled" /></td>
    <td><code>boolean</code></td>
    <td>indicate if AI Playground is enabled in the catalog (wire: isPlaygroundEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if model is publicly accessible (wire: isPublic)</td>
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
    <td><CopyableCode code="latest_version_gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory used for the latest version (wire: latestVersionGpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id_str" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionIdStr)</td>
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
    <td><CopyableCode code="model_format" /></td>
    <td><code>string</code></td>
    <td>Format of the model (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td>Precision this model was trained with</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this model</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="public_dataset_used" /></td>
    <td><code>object</code></td>
    <td> (wire: publicDatasetUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>organization that published the repository</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the model (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the model (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td></td>
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
    <td>Unique name of the model</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Deprecated: Please use latestVersionIdStr instead. ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the model belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of model's owner (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the model belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td>Application of the model</td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the model</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>organization that built the repository (wire: builtBy)</td>
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
    <td>Description of the model</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing explainability for this model</td>
</tr>
<tr>
    <td><CopyableCode code="framework" /></td>
    <td><code>string</code></td>
    <td>Framework used to train this model</td>
</tr>
<tr>
    <td><CopyableCode code="has_playground" /></td>
    <td><code>boolean</code></td>
    <td>indicate if the Model has AI Playground configured (wire: hasPlayground)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the model has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if model is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_playground_enabled" /></td>
    <td><code>boolean</code></td>
    <td>indicate if AI Playground is enabled in the catalog (wire: isPlaygroundEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if model is publicly accessible (wire: isPublic)</td>
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
    <td><CopyableCode code="latest_version_gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory used for the latest version (wire: latestVersionGpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id_str" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionIdStr)</td>
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
    <td><CopyableCode code="model_format" /></td>
    <td><code>string</code></td>
    <td>Format of the model (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td>Precision this model was trained with</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this model</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="public_dataset_used" /></td>
    <td><code>object</code></td>
    <td> (wire: publicDatasetUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>organization that published the repository</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the model (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the model (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td></td>
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
    <td>Unique name of the model</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Deprecated: Please use latestVersionIdStr instead. ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the model belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of model's owner (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the model belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td>Application of the model</td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the model</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>organization that built the repository (wire: builtBy)</td>
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
    <td>Description of the model</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing explainability for this model</td>
</tr>
<tr>
    <td><CopyableCode code="framework" /></td>
    <td><code>string</code></td>
    <td>Framework used to train this model</td>
</tr>
<tr>
    <td><CopyableCode code="has_playground" /></td>
    <td><code>boolean</code></td>
    <td>indicate if the Model has AI Playground configured (wire: hasPlayground)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the model has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if model is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_playground_enabled" /></td>
    <td><code>boolean</code></td>
    <td>indicate if AI Playground is enabled in the catalog (wire: isPlaygroundEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if model is publicly accessible (wire: isPublic)</td>
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
    <td><CopyableCode code="latest_version_gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory used for the latest version (wire: latestVersionGpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id_str" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionIdStr)</td>
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
    <td><CopyableCode code="model_format" /></td>
    <td><code>string</code></td>
    <td>Format of the model (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td>Precision this model was trained with</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this model</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="public_dataset_used" /></td>
    <td><code>object</code></td>
    <td> (wire: publicDatasetUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>organization that published the repository</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the model (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the model (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td></td>
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
    <td>Unique name of the model</td>
</tr>
<tr>
    <td><CopyableCode code="encryption_key_id" /></td>
    <td><code>string</code></td>
    <td>ID of the customer managed encryption key associated with this artifact (wire: encryptionKeyId)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Deprecated: Please use latestVersionIdStr instead. ID of the latest version (wire: latestVersionId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td>Name of the org that the model belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of model's owner (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the model belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td>Application of the model</td>
</tr>
<tr>
    <td><CopyableCode code="bias" /></td>
    <td><code>string</code></td>
    <td>Text describing bias in the model</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>organization that built the repository (wire: builtBy)</td>
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
    <td>Description of the model</td>
</tr>
<tr>
    <td><CopyableCode code="explainability" /></td>
    <td><code>string</code></td>
    <td>Text describing explainability for this model</td>
</tr>
<tr>
    <td><CopyableCode code="framework" /></td>
    <td><code>string</code></td>
    <td>Framework used to train this model</td>
</tr>
<tr>
    <td><CopyableCode code="has_playground" /></td>
    <td><code>boolean</code></td>
    <td>indicate if the Model has AI Playground configured (wire: hasPlayground)</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the model has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if model is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_playground_enabled" /></td>
    <td><code>boolean</code></td>
    <td>indicate if AI Playground is enabled in the catalog (wire: isPlaygroundEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if model is publicly accessible (wire: isPublic)</td>
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
    <td><CopyableCode code="latest_version_gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory used for the latest version (wire: latestVersionGpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version_id_str" /></td>
    <td><code>string</code></td>
    <td>ID of the latest version (wire: latestVersionIdStr)</td>
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
    <td><CopyableCode code="model_format" /></td>
    <td><code>string</code></td>
    <td>Format of the model (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td>Precision this model was trained with</td>
</tr>
<tr>
    <td><CopyableCode code="privacy" /></td>
    <td><code>string</code></td>
    <td>Text describing the privacy for this model</td>
</tr>
<tr>
    <td><CopyableCode code="product_names" /></td>
    <td><code>array</code></td>
    <td> (wire: productNames)</td>
</tr>
<tr>
    <td><CopyableCode code="public_dataset_used" /></td>
    <td><code>object</code></td>
    <td> (wire: publicDatasetUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="publisher" /></td>
    <td><code>string</code></td>
    <td>organization that published the repository</td>
</tr>
<tr>
    <td><CopyableCode code="safety_and_security" /></td>
    <td><code>string</code></td>
    <td>Text for describing the safety and security in the model (wire: safetyAndSecurity)</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the model (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td></td>
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
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a></td>
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>This operation gets info of a model in the org/team.</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a></td>
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>This operation gets info of a model in the org.</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td><a href="#parameter-app_name"><code>app_name</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_reference"><code>page_reference</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>This operation lists models the user can access in the org/team.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-app_name"><code>app_name</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_reference"><code>page_reference</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>This operation lists models the user can access in the org.</td>
</tr>
<tr>
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-framework"><code>framework</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-precision"><code>precision</code></a></td>
    <td></td>
    <td>This operation creates a model in the org/team.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-framework"><code>framework</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-precision"><code>precision</code></a></td>
    <td></td>
    <td>This operation creates a model in the org.</td>
</tr>
<tr>
    <td><a href="#update_by_team"><CopyableCode code="update_by_team" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>This operation updates details of a model in the org/team.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>This operation updates details of a model in the org.</td>
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
<tr id="parameter-model_name">
    <td><CopyableCode code="model_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Model name</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
<tr id="parameter-app_name">
    <td><CopyableCode code="app_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Application name</td>
</tr>
<tr id="parameter-page_number">
    <td><CopyableCode code="page_number" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Page number - zero based index</td>
</tr>
<tr id="parameter-page_reference">
    <td><CopyableCode code="page_reference" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>&#91;Deprecated&#93; Page reference, Use page-number instead</td>
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
        { label: 'get', value: 'get' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

This operation gets info of a model in the org/team.

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
application,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
framework,
has_playground,
has_signed_version,
is_favourite,
is_playground_enabled,
is_public,
is_read_only,
labels,
latest_version_gpu_model,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
policy_labels,
precision,
privacy,
product_names,
public_dataset_used,
publisher,
safety_and_security,
short_description,
updated_date,
versions
FROM nvidia.private_registry.models
WHERE team_name = '{{ team_name }}' -- required
AND model_name = '{{ model_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="get">

This operation gets info of a model in the org.

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
application,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
framework,
has_playground,
has_signed_version,
is_favourite,
is_playground_enabled,
is_public,
is_read_only,
labels,
latest_version_gpu_model,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
policy_labels,
precision,
privacy,
product_names,
public_dataset_used,
publisher,
safety_and_security,
short_description,
updated_date,
versions
FROM nvidia.private_registry.models
WHERE model_name = '{{ model_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list_by_team">

This operation lists models the user can access in the org/team.

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
application,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
framework,
has_playground,
has_signed_version,
is_favourite,
is_playground_enabled,
is_public,
is_read_only,
labels,
latest_version_gpu_model,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
policy_labels,
precision,
privacy,
product_names,
public_dataset_used,
publisher,
safety_and_security,
short_description,
updated_date,
versions
FROM nvidia.private_registry.models
WHERE team_name = '{{ team_name }}' -- required
AND app_name = '{{ app_name }}'
AND page_size = '{{ page_size }}'
AND page_reference = '{{ page_reference }}'
AND page_number = '{{ page_number }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list">

This operation lists models the user can access in the org.

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
application,
bias,
built_by,
can_guest_download,
created_date,
description,
explainability,
framework,
has_playground,
has_signed_version,
is_favourite,
is_playground_enabled,
is_public,
is_read_only,
labels,
latest_version_gpu_model,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
policy_labels,
precision,
privacy,
product_names,
public_dataset_used,
publisher,
safety_and_security,
short_description,
updated_date,
versions
FROM nvidia.private_registry.models
WHERE app_name = '{{ app_name }}'
AND page_size = '{{ page_size }}'
AND page_reference = '{{ page_reference }}'
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

This operation creates a model in the org/team.

```sql
INSERT INTO nvidia.private_registry.models (
application,
bias,
built_by,
description,
display_name,
encryption_key,
explainability,
framework,
has_playground,
is_playground_enabled,
labels,
labels_v2,
license_terms,
logo,
model_format,
name,
owner_name,
precision,
privacy,
public_dataset_used,
publisher,
safety_and_security,
short_description,
team_name
)
SELECT 
'{{ application }}',
'{{ bias }}',
'{{ built_by }}',
'{{ description }}',
'{{ display_name }}',
'{{ encryption_key }}',
'{{ explainability }}',
'{{ framework }}' /* required */,
{{ has_playground }},
{{ is_playground_enabled }},
'{{ labels }}',
'{{ labels_v2 }}',
'{{ license_terms }}',
'{{ logo }}',
'{{ model_format }}',
'{{ name }}' /* required */,
'{{ owner_name }}',
'{{ precision }}' /* required */,
'{{ privacy }}',
'{{ public_dataset_used }}',
'{{ publisher }}',
'{{ safety_and_security }}',
'{{ short_description }}',
'{{ team_name }}'
RETURNING
model,
request_status
;
```
</TabItem>
<TabItem value="create">

This operation creates a model in the org.

```sql
INSERT INTO nvidia.private_registry.models (
application,
bias,
built_by,
description,
display_name,
encryption_key,
explainability,
framework,
has_playground,
is_playground_enabled,
labels,
labels_v2,
license_terms,
logo,
model_format,
name,
owner_name,
precision,
privacy,
public_dataset_used,
publisher,
safety_and_security,
short_description
)
SELECT 
'{{ application }}',
'{{ bias }}',
'{{ built_by }}',
'{{ description }}',
'{{ display_name }}',
'{{ encryption_key }}',
'{{ explainability }}',
'{{ framework }}' /* required */,
{{ has_playground }},
{{ is_playground_enabled }},
'{{ labels }}',
'{{ labels_v2 }}',
'{{ license_terms }}',
'{{ logo }}',
'{{ model_format }}',
'{{ name }}' /* required */,
'{{ owner_name }}',
'{{ precision }}' /* required */,
'{{ privacy }}',
'{{ public_dataset_used }}',
'{{ publisher }}',
'{{ safety_and_security }}',
'{{ short_description }}'
RETURNING
model,
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: models
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the models resource.
    - name: application
      value: "{{ application }}"
      description: |
        Application of the model
    - name: bias
      value: "{{ bias }}"
      description: |
        Text describing bias in the model
    - name: built_by
      value: "{{ built_by }}"
      description: |
        organization that built the repository
    - name: description
      value: "{{ description }}"
      description: |
        Description of the model
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Display name
    - name: encryption_key
      description: |
        Customer Managed Key shard configuration for the model
      value:
        description: "{{ description }}"
        encryptionKeyId: "{{ encryptionKeyId }}"
        useExistingKey: {{ useExistingKey }}
    - name: explainability
      value: "{{ explainability }}"
      description: |
        Text describing explainability for this model
    - name: framework
      value: "{{ framework }}"
      description: |
        Framework used to train this model
    - name: has_playground
      value: {{ has_playground }}
      description: |
        indicate if the Model has AI Playground configured
    - name: is_playground_enabled
      value: {{ is_playground_enabled }}
      description: |
        indicate if AI Playground is enabled in the catalog
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
    - name: model_format
      value: "{{ model_format }}"
      description: |
        Format of the model
    - name: name
      value: "{{ name }}"
      description: |
        Unique name of the model
    - name: owner_name
      value: "{{ owner_name }}"
      description: |
        Name of the user who owns this model
    - name: precision
      value: "{{ precision }}"
      description: |
        Precision this model was trained with
    - name: privacy
      value: "{{ privacy }}"
      description: |
        Text describing the privacy for this model
    - name: public_dataset_used
      value:
        license: "{{ license }}"
        link: "{{ link }}"
        name: "{{ name }}"
    - name: publisher
      value: "{{ publisher }}"
      description: |
        organization that published the repository
    - name: safety_and_security
      value: "{{ safety_and_security }}"
      description: |
        Text for describing the safety and security in the model
    - name: short_description
      value: "{{ short_description }}"
      description: |
        Short description of the model
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

This operation updates details of a model in the org/team.

```sql
UPDATE nvidia.private_registry.models
SET 
application = '{{ application }}',
bias = '{{ bias }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
explainability = '{{ explainability }}',
framework = '{{ framework }}',
has_playground = {{ has_playground }},
is_playground_enabled = {{ is_playground_enabled }},
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
model_format = '{{ model_format }}',
owner_name = '{{ owner_name }}',
precision = '{{ precision }}',
privacy = '{{ privacy }}',
public_dataset_used = '{{ public_dataset_used }}',
publisher = '{{ publisher }}',
safety_and_security = '{{ safety_and_security }}',
short_description = '{{ short_description }}'
WHERE 
team_name = '{{ team_name }}' --required
AND model_name = '{{ model_name }}' --required
RETURNING
model,
request_status;
```
</TabItem>
<TabItem value="update">

This operation updates details of a model in the org.

```sql
UPDATE nvidia.private_registry.models
SET 
application = '{{ application }}',
bias = '{{ bias }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
explainability = '{{ explainability }}',
framework = '{{ framework }}',
has_playground = {{ has_playground }},
is_playground_enabled = {{ is_playground_enabled }},
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
model_format = '{{ model_format }}',
owner_name = '{{ owner_name }}',
precision = '{{ precision }}',
privacy = '{{ privacy }}',
public_dataset_used = '{{ public_dataset_used }}',
publisher = '{{ publisher }}',
safety_and_security = '{{ safety_and_security }}',
short_description = '{{ short_description }}'
WHERE 
model_name = '{{ model_name }}' --required
RETURNING
model,
request_status;
```
</TabItem>
</Tabs>
