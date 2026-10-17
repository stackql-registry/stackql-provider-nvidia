--- 
title: collection_artifacts
hide_title: false
hide_table_of_contents: false
keywords:
  - collection_artifacts
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

Creates, updates, deletes, gets or lists a <code>collection_artifacts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="collection_artifacts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.collection_artifacts" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list_by_team"
    values={[
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
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
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List collection artifacts the user can access in the specified org and team</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List collection artifacts the user can access in the specified org</td>
</tr>
<tr>
    <td><a href="#add_cross_org_team_by_team"><CopyableCode code="add_cross_org_team_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_team_name"><code>artifact_team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Add artifact to the specified collection in the specified org and team from another org and team</td>
</tr>
<tr>
    <td><a href="#add_cross_org_team"><CopyableCode code="add_cross_org_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_team_name"><code>artifact_team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Add artifact to the specified collection in the specified org from another org and team</td>
</tr>
<tr>
    <td><a href="#add_cross_org_by_team"><CopyableCode code="add_cross_org_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Add artifact to the specified collection in the specified org and team from another org</td>
</tr>
<tr>
    <td><a href="#add_cross_org"><CopyableCode code="add_cross_org" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Add artifact to the specified collection in the specified org from another org</td>
</tr>
<tr>
    <td><a href="#add_by_team"><CopyableCode code="add_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Add artifact to the specified collection in the specified org and team</td>
</tr>
<tr>
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Add artifact to the specified collection in the specified org</td>
</tr>
<tr>
    <td><a href="#update_bulk_by_team"><CopyableCode code="update_bulk_by_team" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a></td>
    <td></td>
    <td>Patch collection in the specified org and team</td>
</tr>
<tr>
    <td><a href="#update_bulk"><CopyableCode code="update_bulk" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a></td>
    <td></td>
    <td>Patch collection in the specified org</td>
</tr>
<tr>
    <td><a href="#remove_cross_org_team_by_team"><CopyableCode code="remove_cross_org_team_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_team_name"><code>artifact_team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Remove artifact from the specified collection in the specified org and team from another org and team</td>
</tr>
<tr>
    <td><a href="#remove_cross_org_team"><CopyableCode code="remove_cross_org_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_team_name"><code>artifact_team_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Remove artifact from the specified collection in the specified org from another org</td>
</tr>
<tr>
    <td><a href="#remove_cross_org_by_team"><CopyableCode code="remove_cross_org_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Remove artifact from the specified collection in the specified org and team from another org</td>
</tr>
<tr>
    <td><a href="#remove_cross_org"><CopyableCode code="remove_cross_org" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_org_name"><code>artifact_org_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Remove artifact from the specified collection in the specified org from another org</td>
</tr>
<tr>
    <td><a href="#remove_by_team"><CopyableCode code="remove_by_team" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Remove artifact from the specified collection in the specified org and team</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-collection_name"><code>collection_name</code></a>, <a href="#parameter-artifact_type"><code>artifact_type</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a></td>
    <td></td>
    <td>Remove artifact from the specified collection in the specified org</td>
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
<tr id="parameter-artifact_org_name">
    <td><CopyableCode code="artifact_org_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact organization name</td>
</tr>
<tr id="parameter-artifact_team_name">
    <td><CopyableCode code="artifact_team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact team name</td>
</tr>
<tr id="parameter-artifact_type">
    <td><CopyableCode code="artifact_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Artifact type</td>
</tr>
<tr id="parameter-collection_name">
    <td><CopyableCode code="collection_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Collection name</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Order by</td>
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
    defaultValue="list_by_team"
    values={[
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_by_team">

List collection artifacts the user can access in the specified org and team

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
FROM nvidia.private_registry.collection_artifacts
WHERE team_name = '{{ team_name }}' -- required
AND collection_name = '{{ collection_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND order_by = '{{ order_by }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list">

List collection artifacts the user can access in the specified org

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
FROM nvidia.private_registry.collection_artifacts
WHERE collection_name = '{{ collection_name }}' -- required
AND artifact_type = '{{ artifact_type }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND order_by = '{{ order_by }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="add_cross_org_team_by_team"
    values={[
        { label: 'add_cross_org_team_by_team', value: 'add_cross_org_team_by_team' },
        { label: 'add_cross_org_team', value: 'add_cross_org_team' },
        { label: 'add_cross_org_by_team', value: 'add_cross_org_by_team' },
        { label: 'add_cross_org', value: 'add_cross_org' },
        { label: 'add_by_team', value: 'add_by_team' },
        { label: 'add', value: 'add' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add_cross_org_team_by_team">

Add artifact to the specified collection in the specified org and team from another org and team

```sql
INSERT INTO nvidia.private_registry.collection_artifacts (
team_name,
collection_name,
artifact_org_name,
artifact_team_name,
artifact_type,
artifact_name
)
SELECT 
'{{ team_name }}',
'{{ collection_name }}',
'{{ artifact_org_name }}',
'{{ artifact_team_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add_cross_org_team">

Add artifact to the specified collection in the specified org from another org and team

```sql
INSERT INTO nvidia.private_registry.collection_artifacts (
collection_name,
artifact_org_name,
artifact_team_name,
artifact_type,
artifact_name
)
SELECT 
'{{ collection_name }}',
'{{ artifact_org_name }}',
'{{ artifact_team_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add_cross_org_by_team">

Add artifact to the specified collection in the specified org and team from another org

```sql
INSERT INTO nvidia.private_registry.collection_artifacts (
team_name,
collection_name,
artifact_org_name,
artifact_type,
artifact_name
)
SELECT 
'{{ team_name }}',
'{{ collection_name }}',
'{{ artifact_org_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add_cross_org">

Add artifact to the specified collection in the specified org from another org

```sql
INSERT INTO nvidia.private_registry.collection_artifacts (
collection_name,
artifact_org_name,
artifact_type,
artifact_name
)
SELECT 
'{{ collection_name }}',
'{{ artifact_org_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add_by_team">

Add artifact to the specified collection in the specified org and team

```sql
INSERT INTO nvidia.private_registry.collection_artifacts (
team_name,
collection_name,
artifact_type,
artifact_name
)
SELECT 
'{{ team_name }}',
'{{ collection_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="add">

Add artifact to the specified collection in the specified org

```sql
INSERT INTO nvidia.private_registry.collection_artifacts (
collection_name,
artifact_type,
artifact_name
)
SELECT 
'{{ collection_name }}',
'{{ artifact_type }}',
'{{ artifact_name }}'
RETURNING
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: collection_artifacts
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the collection_artifacts resource.
    - name: collection_name
      value: "{{ collection_name }}"
      description: Required parameter for the collection_artifacts resource.
    - name: artifact_org_name
      value: "{{ artifact_org_name }}"
      description: Required parameter for the collection_artifacts resource.
    - name: artifact_team_name
      value: "{{ artifact_team_name }}"
      description: Required parameter for the collection_artifacts resource.
    - name: artifact_type
      value: "{{ artifact_type }}"
      description: Required parameter for the collection_artifacts resource.
    - name: artifact_name
      value: "{{ artifact_name }}"
      description: Required parameter for the collection_artifacts resource.
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update_bulk_by_team"
    values={[
        { label: 'update_bulk_by_team', value: 'update_bulk_by_team' },
        { label: 'update_bulk', value: 'update_bulk' }
    ]}
>
<TabItem value="update_bulk_by_team">

Patch collection in the specified org and team

```sql
UPDATE nvidia.private_registry.collection_artifacts
SET 
operations = '{{ operations }}'
WHERE 
team_name = '{{ team_name }}' --required
AND collection_name = '{{ collection_name }}' --required
RETURNING
request_status;
```
</TabItem>
<TabItem value="update_bulk">

Patch collection in the specified org

```sql
UPDATE nvidia.private_registry.collection_artifacts
SET 
operations = '{{ operations }}'
WHERE 
collection_name = '{{ collection_name }}' --required
RETURNING
request_status;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="remove_cross_org_team_by_team"
    values={[
        { label: 'remove_cross_org_team_by_team', value: 'remove_cross_org_team_by_team' },
        { label: 'remove_cross_org_team', value: 'remove_cross_org_team' },
        { label: 'remove_cross_org_by_team', value: 'remove_cross_org_by_team' },
        { label: 'remove_cross_org', value: 'remove_cross_org' },
        { label: 'remove_by_team', value: 'remove_by_team' },
        { label: 'remove', value: 'remove' }
    ]}
>
<TabItem value="remove_cross_org_team_by_team">

Remove artifact from the specified collection in the specified org and team from another org and team

```sql
DELETE FROM nvidia.private_registry.collection_artifacts
WHERE team_name = '{{ team_name }}' --required
AND collection_name = '{{ collection_name }}' --required
AND artifact_org_name = '{{ artifact_org_name }}' --required
AND artifact_team_name = '{{ artifact_team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="remove_cross_org_team">

Remove artifact from the specified collection in the specified org from another org

```sql
DELETE FROM nvidia.private_registry.collection_artifacts
WHERE collection_name = '{{ collection_name }}' --required
AND artifact_org_name = '{{ artifact_org_name }}' --required
AND artifact_team_name = '{{ artifact_team_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="remove_cross_org_by_team">

Remove artifact from the specified collection in the specified org and team from another org

```sql
DELETE FROM nvidia.private_registry.collection_artifacts
WHERE team_name = '{{ team_name }}' --required
AND collection_name = '{{ collection_name }}' --required
AND artifact_org_name = '{{ artifact_org_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="remove_cross_org">

Remove artifact from the specified collection in the specified org from another org

```sql
DELETE FROM nvidia.private_registry.collection_artifacts
WHERE collection_name = '{{ collection_name }}' --required
AND artifact_org_name = '{{ artifact_org_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="remove_by_team">

Remove artifact from the specified collection in the specified org and team

```sql
DELETE FROM nvidia.private_registry.collection_artifacts
WHERE team_name = '{{ team_name }}' --required
AND collection_name = '{{ collection_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
<TabItem value="remove">

Remove artifact from the specified collection in the specified org

```sql
DELETE FROM nvidia.private_registry.collection_artifacts
WHERE collection_name = '{{ collection_name }}' --required
AND artifact_type = '{{ artifact_type }}' --required
AND artifact_name = '{{ artifact_name }}' --required
;
```
</TabItem>
</Tabs>
