--- 
title: resources
hide_title: false
hide_table_of_contents: false
keywords:
  - resources
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

Creates, updates, deletes, gets or lists a <code>resources</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="resources" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.resources" /></td></tr>
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
    <td>Unique name of the recipe</td>
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
    <td>Name of the org that the recipe belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the recipe belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="advanced" /></td>
    <td><code>string</code></td>
    <td>Text for describing advanced information</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td> (CLASSIFICATION, OBJECT_DETECTION, SEGMENTATION, TRANSLATION, TEXT_TO_SPEECH, RECOMMENDER, SENTIMENT, NLP, KUBEFLOW_PIPELINE, OTHER, SPEAKER_VERIFICATION, PUNCTUATION_AND_CAPITALIZATION, DIALOG_STATE_TRACKING, SPEAKER_DIARIZATION, SPEAKER_RECOGNITION, SPEECH_SYNTHESIS, VOICE_ACTIVITY_DETECTION, SPEECH_RECOGNITION, LANGUAGE_MODELING, NAMED_ENTITY_RECOGNITION, TEXT_CLASSIFICATION, TEXT_PROCESSING, QUESTION_ANSWERING, CONTENT_GENERATION)</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the recipe (wire: builtBy)</td>
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
    <td>Description of the recipe</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the recipe has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if recipe is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this recipe is publicly accessible (wire: isPublic)</td>
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
    <td>Format of the model this recipe produces (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="performance" /></td>
    <td><code>string</code></td>
    <td>Text describing performance of the recipe results</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td> (FP16, FP32, INT8, FPBOTH, OTHER, ALL)</td>
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
    <td>Organization that published this recipe</td>
</tr>
<tr>
    <td><CopyableCode code="quick_start_guide" /></td>
    <td><code>string</code></td>
    <td>Text with a guide to getting started (wire: quickStartGuide)</td>
</tr>
<tr>
    <td><CopyableCode code="related_models" /></td>
    <td><code>array</code></td>
    <td> (wire: relatedModels)</td>
</tr>
<tr>
    <td><CopyableCode code="setup" /></td>
    <td><code>string</code></td>
    <td>Text describing recipe setup</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the recipe (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="training_framework" /></td>
    <td><code>string</code></td>
    <td> (TensorFlow, Caffe2, CNTK, Torch, PyTorch, MXNet, Keras, Other, TransferLearningToolkit, TensorFlow2) (wire: trainingFramework)</td>
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
    <td>Unique name of the recipe</td>
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
    <td>Name of the org that the recipe belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the recipe belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="advanced" /></td>
    <td><code>string</code></td>
    <td>Text for describing advanced information</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td> (CLASSIFICATION, OBJECT_DETECTION, SEGMENTATION, TRANSLATION, TEXT_TO_SPEECH, RECOMMENDER, SENTIMENT, NLP, KUBEFLOW_PIPELINE, OTHER, SPEAKER_VERIFICATION, PUNCTUATION_AND_CAPITALIZATION, DIALOG_STATE_TRACKING, SPEAKER_DIARIZATION, SPEAKER_RECOGNITION, SPEECH_SYNTHESIS, VOICE_ACTIVITY_DETECTION, SPEECH_RECOGNITION, LANGUAGE_MODELING, NAMED_ENTITY_RECOGNITION, TEXT_CLASSIFICATION, TEXT_PROCESSING, QUESTION_ANSWERING, CONTENT_GENERATION)</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the recipe (wire: builtBy)</td>
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
    <td>Description of the recipe</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the recipe has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if recipe is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this recipe is publicly accessible (wire: isPublic)</td>
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
    <td>Format of the model this recipe produces (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="performance" /></td>
    <td><code>string</code></td>
    <td>Text describing performance of the recipe results</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td> (FP16, FP32, INT8, FPBOTH, OTHER, ALL)</td>
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
    <td>Organization that published this recipe</td>
</tr>
<tr>
    <td><CopyableCode code="quick_start_guide" /></td>
    <td><code>string</code></td>
    <td>Text with a guide to getting started (wire: quickStartGuide)</td>
</tr>
<tr>
    <td><CopyableCode code="related_models" /></td>
    <td><code>array</code></td>
    <td> (wire: relatedModels)</td>
</tr>
<tr>
    <td><CopyableCode code="setup" /></td>
    <td><code>string</code></td>
    <td>Text describing recipe setup</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the recipe (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="training_framework" /></td>
    <td><code>string</code></td>
    <td> (TensorFlow, Caffe2, CNTK, Torch, PyTorch, MXNet, Keras, Other, TransferLearningToolkit, TensorFlow2) (wire: trainingFramework)</td>
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
    <td>Unique name of the recipe</td>
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
    <td>Name of the org that the recipe belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the recipe belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="advanced" /></td>
    <td><code>string</code></td>
    <td>Text for describing advanced information</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td> (CLASSIFICATION, OBJECT_DETECTION, SEGMENTATION, TRANSLATION, TEXT_TO_SPEECH, RECOMMENDER, SENTIMENT, NLP, KUBEFLOW_PIPELINE, OTHER, SPEAKER_VERIFICATION, PUNCTUATION_AND_CAPITALIZATION, DIALOG_STATE_TRACKING, SPEAKER_DIARIZATION, SPEAKER_RECOGNITION, SPEECH_SYNTHESIS, VOICE_ACTIVITY_DETECTION, SPEECH_RECOGNITION, LANGUAGE_MODELING, NAMED_ENTITY_RECOGNITION, TEXT_CLASSIFICATION, TEXT_PROCESSING, QUESTION_ANSWERING, CONTENT_GENERATION)</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the recipe (wire: builtBy)</td>
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
    <td>Description of the recipe</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the recipe has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if recipe is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this recipe is publicly accessible (wire: isPublic)</td>
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
    <td>Format of the model this recipe produces (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="performance" /></td>
    <td><code>string</code></td>
    <td>Text describing performance of the recipe results</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td> (FP16, FP32, INT8, FPBOTH, OTHER, ALL)</td>
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
    <td>Organization that published this recipe</td>
</tr>
<tr>
    <td><CopyableCode code="quick_start_guide" /></td>
    <td><code>string</code></td>
    <td>Text with a guide to getting started (wire: quickStartGuide)</td>
</tr>
<tr>
    <td><CopyableCode code="related_models" /></td>
    <td><code>array</code></td>
    <td> (wire: relatedModels)</td>
</tr>
<tr>
    <td><CopyableCode code="setup" /></td>
    <td><code>string</code></td>
    <td>Text describing recipe setup</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the recipe (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="training_framework" /></td>
    <td><code>string</code></td>
    <td> (TensorFlow, Caffe2, CNTK, Torch, PyTorch, MXNet, Keras, Other, TransferLearningToolkit, TensorFlow2) (wire: trainingFramework)</td>
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
    <td>Unique name of the recipe</td>
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
    <td>Name of the org that the recipe belongs to (wire: orgName)</td>
</tr>
<tr>
    <td><CopyableCode code="team_name" /></td>
    <td><code>string</code></td>
    <td>Name of the team that the recipe belongs to (wire: teamName)</td>
</tr>
<tr>
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td> (LISTED, EXCLUSIVE, NOT_LISTED) (wire: accessType)</td>
</tr>
<tr>
    <td><CopyableCode code="advanced" /></td>
    <td><code>string</code></td>
    <td>Text for describing advanced information</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>string</code></td>
    <td> (CLASSIFICATION, OBJECT_DETECTION, SEGMENTATION, TRANSLATION, TEXT_TO_SPEECH, RECOMMENDER, SENTIMENT, NLP, KUBEFLOW_PIPELINE, OTHER, SPEAKER_VERIFICATION, PUNCTUATION_AND_CAPITALIZATION, DIALOG_STATE_TRACKING, SPEAKER_DIARIZATION, SPEAKER_RECOGNITION, SPEECH_SYNTHESIS, VOICE_ACTIVITY_DETECTION, SPEECH_RECOGNITION, LANGUAGE_MODELING, NAMED_ENTITY_RECOGNITION, TEXT_CLASSIFICATION, TEXT_PROCESSING, QUESTION_ANSWERING, CONTENT_GENERATION)</td>
</tr>
<tr>
    <td><CopyableCode code="built_by" /></td>
    <td><code>string</code></td>
    <td>Organization that built the recipe (wire: builtBy)</td>
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
    <td>Description of the recipe</td>
</tr>
<tr>
    <td><CopyableCode code="has_signed_version" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the recipe has any signed versions (wire: hasSignedVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Flag indicating if recipe is user's favorite (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td>Determines if this recipe is publicly accessible (wire: isPublic)</td>
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
    <td>Format of the model this recipe produces (wire: modelFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="performance" /></td>
    <td><code>string</code></td>
    <td>Text describing performance of the recipe results</td>
</tr>
<tr>
    <td><CopyableCode code="policy_labels" /></td>
    <td><code>array</code></td>
    <td> (wire: policyLabels)</td>
</tr>
<tr>
    <td><CopyableCode code="precision" /></td>
    <td><code>string</code></td>
    <td> (FP16, FP32, INT8, FPBOTH, OTHER, ALL)</td>
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
    <td>Organization that published this recipe</td>
</tr>
<tr>
    <td><CopyableCode code="quick_start_guide" /></td>
    <td><code>string</code></td>
    <td>Text with a guide to getting started (wire: quickStartGuide)</td>
</tr>
<tr>
    <td><CopyableCode code="related_models" /></td>
    <td><code>array</code></td>
    <td> (wire: relatedModels)</td>
</tr>
<tr>
    <td><CopyableCode code="setup" /></td>
    <td><code>string</code></td>
    <td>Text describing recipe setup</td>
</tr>
<tr>
    <td><CopyableCode code="short_description" /></td>
    <td><code>string</code></td>
    <td>Short description of the recipe (wire: shortDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="training_framework" /></td>
    <td><code>string</code></td>
    <td> (TensorFlow, Caffe2, CNTK, Torch, PyTorch, MXNet, Keras, Other, TransferLearningToolkit, TensorFlow2) (wire: trainingFramework)</td>
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
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-recipe_name"><code>recipe_name</code></a></td>
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>Get recipe details in team</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-recipe_name"><code>recipe_name</code></a></td>
    <td><a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>Get recipe in org</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a></td>
    <td><a href="#parameter-app_name"><code>app_name</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List recipes the user can access in the specified org and team</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-app_name"><code>app_name</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-resolve_labels"><code>resolve_labels</code></a>, <a href="#parameter-remove_unresolved_labels"><code>remove_unresolved_labels</code></a></td>
    <td>List recipes the user can access in the specified org</td>
</tr>
<tr>
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-application"><code>application</code></a>, <a href="#parameter-model_format"><code>model_format</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-precision"><code>precision</code></a>, <a href="#parameter-public_dataset_used"><code>public_dataset_used</code></a>, <a href="#parameter-short_description"><code>short_description</code></a>, <a href="#parameter-training_framework"><code>training_framework</code></a></td>
    <td></td>
    <td>Create recipe in team</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-application"><code>application</code></a>, <a href="#parameter-model_format"><code>model_format</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-precision"><code>precision</code></a>, <a href="#parameter-public_dataset_used"><code>public_dataset_used</code></a>, <a href="#parameter-short_description"><code>short_description</code></a>, <a href="#parameter-training_framework"><code>training_framework</code></a></td>
    <td></td>
    <td>Create recipe in org</td>
</tr>
<tr>
    <td><a href="#update_by_team"><CopyableCode code="update_by_team" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-recipe_name"><code>recipe_name</code></a></td>
    <td></td>
    <td>Update recipe details in team</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-recipe_name"><code>recipe_name</code></a></td>
    <td></td>
    <td>Update recipe details in org</td>
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
<tr id="parameter-recipe_name">
    <td><CopyableCode code="recipe_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Recipe name</td>
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

Get recipe details in team

```sql
SELECT
name,
latest_version_id,
display_name,
org_name,
team_name,
access_type,
advanced,
application,
built_by,
can_guest_download,
created_date,
description,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
performance,
policy_labels,
precision,
product_names,
public_dataset_used,
publisher,
quick_start_guide,
related_models,
setup,
short_description,
training_framework,
updated_date
FROM nvidia.private_registry.resources
WHERE team_name = '{{ team_name }}' -- required
AND recipe_name = '{{ recipe_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="get">

Get recipe in org

```sql
SELECT
name,
latest_version_id,
display_name,
org_name,
team_name,
access_type,
advanced,
application,
built_by,
can_guest_download,
created_date,
description,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
performance,
policy_labels,
precision,
product_names,
public_dataset_used,
publisher,
quick_start_guide,
related_models,
setup,
short_description,
training_framework,
updated_date
FROM nvidia.private_registry.resources
WHERE recipe_name = '{{ recipe_name }}' -- required
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list_by_team">

List recipes the user can access in the specified org and team

```sql
SELECT
name,
latest_version_id,
display_name,
org_name,
team_name,
access_type,
advanced,
application,
built_by,
can_guest_download,
created_date,
description,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
performance,
policy_labels,
precision,
product_names,
public_dataset_used,
publisher,
quick_start_guide,
related_models,
setup,
short_description,
training_framework,
updated_date
FROM nvidia.private_registry.resources
WHERE team_name = '{{ team_name }}' -- required
AND app_name = '{{ app_name }}'
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND resolve_labels = '{{ resolve_labels }}'
AND remove_unresolved_labels = '{{ remove_unresolved_labels }}'
;
```
</TabItem>
<TabItem value="list">

List recipes the user can access in the specified org

```sql
SELECT
name,
latest_version_id,
display_name,
org_name,
team_name,
access_type,
advanced,
application,
built_by,
can_guest_download,
created_date,
description,
has_signed_version,
is_favourite,
is_public,
is_read_only,
labels,
latest_version_id_str,
latest_version_size_in_bytes,
license_terms,
logo,
model_format,
performance,
policy_labels,
precision,
product_names,
public_dataset_used,
publisher,
quick_start_guide,
related_models,
setup,
short_description,
training_framework,
updated_date
FROM nvidia.private_registry.resources
WHERE app_name = '{{ app_name }}'
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

Create recipe in team

```sql
INSERT INTO nvidia.private_registry.resources (
advanced,
application,
built_by,
description,
display_name,
labels,
labels_v2,
license_terms,
logo,
model_format,
name,
performance,
precision,
public_dataset_used,
publisher,
quick_start_guide,
setup,
short_description,
training_framework,
team_name
)
SELECT 
'{{ advanced }}',
'{{ application }}' /* required */,
'{{ built_by }}',
'{{ description }}',
'{{ display_name }}',
'{{ labels }}',
'{{ labels_v2 }}',
'{{ license_terms }}',
'{{ logo }}',
'{{ model_format }}' /* required */,
'{{ name }}' /* required */,
'{{ performance }}',
'{{ precision }}' /* required */,
'{{ public_dataset_used }}' /* required */,
'{{ publisher }}',
'{{ quick_start_guide }}',
'{{ setup }}',
'{{ short_description }}' /* required */,
'{{ training_framework }}' /* required */,
'{{ team_name }}'
RETURNING
recipe,
request_status
;
```
</TabItem>
<TabItem value="create">

Create recipe in org

```sql
INSERT INTO nvidia.private_registry.resources (
advanced,
application,
built_by,
description,
display_name,
labels,
labels_v2,
license_terms,
logo,
model_format,
name,
performance,
precision,
public_dataset_used,
publisher,
quick_start_guide,
setup,
short_description,
training_framework
)
SELECT 
'{{ advanced }}',
'{{ application }}' /* required */,
'{{ built_by }}',
'{{ description }}',
'{{ display_name }}',
'{{ labels }}',
'{{ labels_v2 }}',
'{{ license_terms }}',
'{{ logo }}',
'{{ model_format }}' /* required */,
'{{ name }}' /* required */,
'{{ performance }}',
'{{ precision }}' /* required */,
'{{ public_dataset_used }}' /* required */,
'{{ publisher }}',
'{{ quick_start_guide }}',
'{{ setup }}',
'{{ short_description }}' /* required */,
'{{ training_framework }}' /* required */
RETURNING
recipe,
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: resources
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the resources resource.
    - name: advanced
      value: "{{ advanced }}"
      description: |
        Text for describing advanced information
    - name: application
      value: "{{ application }}"
      valid_values: ['CLASSIFICATION', 'OBJECT_DETECTION', 'SEGMENTATION', 'TRANSLATION', 'TEXT_TO_SPEECH', 'RECOMMENDER', 'SENTIMENT', 'NLP', 'KUBEFLOW_PIPELINE', 'OTHER', 'SPEAKER_VERIFICATION', 'PUNCTUATION_AND_CAPITALIZATION', 'DIALOG_STATE_TRACKING', 'SPEAKER_DIARIZATION', 'SPEAKER_RECOGNITION', 'SPEECH_SYNTHESIS', 'VOICE_ACTIVITY_DETECTION', 'SPEECH_RECOGNITION', 'LANGUAGE_MODELING', 'NAMED_ENTITY_RECOGNITION', 'TEXT_CLASSIFICATION', 'TEXT_PROCESSING', 'QUESTION_ANSWERING', 'CONTENT_GENERATION']
    - name: built_by
      value: "{{ built_by }}"
      description: |
        organization that built the recipe
    - name: description
      value: "{{ description }}"
      description: |
        Description of the recipe
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Display name
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
        Format of the model this recipe produces
    - name: name
      value: "{{ name }}"
      description: |
        Unique name of the recipe
    - name: performance
      value: "{{ performance }}"
      description: |
        Text describing performance of the recipe results
    - name: precision
      value: "{{ precision }}"
      valid_values: ['FP16', 'FP32', 'INT8', 'FPBOTH', 'OTHER', 'ALL']
    - name: public_dataset_used
      value:
        license: "{{ license }}"
        link: "{{ link }}"
        name: "{{ name }}"
    - name: publisher
      value: "{{ publisher }}"
      description: |
        organization that published the recipe
    - name: quick_start_guide
      value: "{{ quick_start_guide }}"
      description: |
        Text with a guide to getting started
    - name: setup
      value: "{{ setup }}"
      description: |
        Text describing recipe setup
    - name: short_description
      value: "{{ short_description }}"
      description: |
        Short description of the recipe
    - name: training_framework
      value: "{{ training_framework }}"
      valid_values: ['TensorFlow', 'Caffe2', 'CNTK', 'Torch', 'PyTorch', 'MXNet', 'Keras', 'Other', 'TransferLearningToolkit', 'TensorFlow2']
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

Update recipe details in team

```sql
UPDATE nvidia.private_registry.resources
SET 
advanced = '{{ advanced }}',
application = '{{ application }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
model_format = '{{ model_format }}',
performance = '{{ performance }}',
precision = '{{ precision }}',
public_dataset_used = '{{ public_dataset_used }}',
publisher = '{{ publisher }}',
quick_start_guide = '{{ quick_start_guide }}',
related_models = '{{ related_models }}',
setup = '{{ setup }}',
short_description = '{{ short_description }}',
training_framework = '{{ training_framework }}'
WHERE 
team_name = '{{ team_name }}' --required
AND recipe_name = '{{ recipe_name }}' --required
RETURNING
recipe,
request_status;
```
</TabItem>
<TabItem value="update">

Update recipe details in org

```sql
UPDATE nvidia.private_registry.resources
SET 
advanced = '{{ advanced }}',
application = '{{ application }}',
built_by = '{{ built_by }}',
description = '{{ description }}',
display_name = '{{ display_name }}',
labels = '{{ labels }}',
labels_v2 = '{{ labels_v2 }}',
license_terms = '{{ license_terms }}',
logo = '{{ logo }}',
model_format = '{{ model_format }}',
performance = '{{ performance }}',
precision = '{{ precision }}',
public_dataset_used = '{{ public_dataset_used }}',
publisher = '{{ publisher }}',
quick_start_guide = '{{ quick_start_guide }}',
related_models = '{{ related_models }}',
setup = '{{ setup }}',
short_description = '{{ short_description }}',
training_framework = '{{ training_framework }}'
WHERE 
recipe_name = '{{ recipe_name }}' --required
RETURNING
recipe,
request_status;
```
</TabItem>
</Tabs>
