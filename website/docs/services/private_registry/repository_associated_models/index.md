--- 
title: repository_associated_models
hide_title: false
hide_table_of_contents: false
keywords:
  - repository_associated_models
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

Creates, updates, deletes, gets or lists a <code>repository_associated_models</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="repository_associated_models" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.repository_associated_models" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list_by_tag_by_team"
    values={[
        { label: 'list_by_tag_by_team', value: 'list_by_tag_by_team' },
        { label: 'list_by_tag', value: 'list_by_tag' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_by_tag_by_team">

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
    <td>Deprecated: Please use versionId instead. Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string</code></td>
    <td>Unique version id. Please use this instead of 'id' (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="accuracy_reached" /></td>
    <td><code>number (float)</code></td>
    <td>Accuracy this model reached (wire: accuracyReached)</td>
</tr>
<tr>
    <td><CopyableCode code="batch_size" /></td>
    <td><code>integer (int64)</code></td>
    <td>Batch size this model was trained with (wire: batchSize)</td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this model (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the model version</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory (wire: gpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_footprint" /></td>
    <td><code>string</code></td>
    <td>Model size/memory footprint for inference (wire: memoryFootprint)</td>
</tr>
<tr>
    <td><CopyableCode code="number_of_epochs" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of epochs this model trained (wire: numberOfEpochs)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_container_configuration" /></td>
    <td><code>object</code></td>
    <td>NVCF container configuration parameters (wire: nvcfContainerConfiguration)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_deployment_specification" /></td>
    <td><code>object</code></td>
    <td>NVCF deployment specification (wire: nvcfDeploymentSpecification)</td>
</tr>
<tr>
    <td><CopyableCode code="other_contents" /></td>
    <td><code>array</code></td>
    <td> (wire: otherContents)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the model in bytes (wire: totalSizeInBytes)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_date" /></td>
    <td><code>string</code></td>
    <td>Updated date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: updatedDate)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_tag">

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
    <td>Deprecated: Please use versionId instead. Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string</code></td>
    <td>Unique version id. Please use this instead of 'id' (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="accuracy_reached" /></td>
    <td><code>number (float)</code></td>
    <td>Accuracy this model reached (wire: accuracyReached)</td>
</tr>
<tr>
    <td><CopyableCode code="batch_size" /></td>
    <td><code>integer (int64)</code></td>
    <td>Batch size this model was trained with (wire: batchSize)</td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this model (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the model version</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory (wire: gpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_footprint" /></td>
    <td><code>string</code></td>
    <td>Model size/memory footprint for inference (wire: memoryFootprint)</td>
</tr>
<tr>
    <td><CopyableCode code="number_of_epochs" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of epochs this model trained (wire: numberOfEpochs)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_container_configuration" /></td>
    <td><code>object</code></td>
    <td>NVCF container configuration parameters (wire: nvcfContainerConfiguration)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_deployment_specification" /></td>
    <td><code>object</code></td>
    <td>NVCF deployment specification (wire: nvcfDeploymentSpecification)</td>
</tr>
<tr>
    <td><CopyableCode code="other_contents" /></td>
    <td><code>array</code></td>
    <td> (wire: otherContents)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the model in bytes (wire: totalSizeInBytes)</td>
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Deprecated: Please use versionId instead. Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string</code></td>
    <td>Unique version id. Please use this instead of 'id' (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="accuracy_reached" /></td>
    <td><code>number (float)</code></td>
    <td>Accuracy this model reached (wire: accuracyReached)</td>
</tr>
<tr>
    <td><CopyableCode code="batch_size" /></td>
    <td><code>integer (int64)</code></td>
    <td>Batch size this model was trained with (wire: batchSize)</td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this model (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the model version</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory (wire: gpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_footprint" /></td>
    <td><code>string</code></td>
    <td>Model size/memory footprint for inference (wire: memoryFootprint)</td>
</tr>
<tr>
    <td><CopyableCode code="number_of_epochs" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of epochs this model trained (wire: numberOfEpochs)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_container_configuration" /></td>
    <td><code>object</code></td>
    <td>NVCF container configuration parameters (wire: nvcfContainerConfiguration)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_deployment_specification" /></td>
    <td><code>object</code></td>
    <td>NVCF deployment specification (wire: nvcfDeploymentSpecification)</td>
</tr>
<tr>
    <td><CopyableCode code="other_contents" /></td>
    <td><code>array</code></td>
    <td> (wire: otherContents)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the model in bytes (wire: totalSizeInBytes)</td>
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Deprecated: Please use versionId instead. Unique ID of the version</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string</code></td>
    <td>Unique version id. Please use this instead of 'id' (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_name" /></td>
    <td><code>string</code></td>
    <td>Name of the user who owns this version (wire: ownerName)</td>
</tr>
<tr>
    <td><CopyableCode code="accuracy_reached" /></td>
    <td><code>number (float)</code></td>
    <td>Accuracy this model reached (wire: accuracyReached)</td>
</tr>
<tr>
    <td><CopyableCode code="batch_size" /></td>
    <td><code>integer (int64)</code></td>
    <td>Batch size this model was trained with (wire: batchSize)</td>
</tr>
<tr>
    <td><CopyableCode code="created_by_user" /></td>
    <td><code>string</code></td>
    <td>Id of the user who created this model (wire: createdByUser)</td>
</tr>
<tr>
    <td><CopyableCode code="created_date" /></td>
    <td><code>string</code></td>
    <td>Creation date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: createdDate)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_metrics" /></td>
    <td><code>array</code></td>
    <td> (wire: customMetrics)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the model version</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_model" /></td>
    <td><code>string</code></td>
    <td>GPU model and memory (wire: gpuModel)</td>
</tr>
<tr>
    <td><CopyableCode code="is_signed" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the version is signed (wire: isSigned)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_date" /></td>
    <td><code>string</code></td>
    <td>Scan date in ISO-8601 format (pattern: &lt;code&gt;\d&#123;4&#125;-&#91;01&#93;\d-&#91;0-3&#93;\dT&#91;0-2&#93;\d:&#91;0-5&#93;\d:&#91;0-5&#93;\d\.\d+Z&lt;/code&gt;) (wire: malwareScanDate)</td>
</tr>
<tr>
    <td><CopyableCode code="malware_scan_status" /></td>
    <td><code>string</code></td>
    <td>Malware scan status (NOT_SCANNED, IN_PROGRESS, CLEAN, SUSPICIOUS, FAILED, MALICIOUS) (wire: malwareScanStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_footprint" /></td>
    <td><code>string</code></td>
    <td>Model size/memory footprint for inference (wire: memoryFootprint)</td>
</tr>
<tr>
    <td><CopyableCode code="number_of_epochs" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of epochs this model trained (wire: numberOfEpochs)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_container_configuration" /></td>
    <td><code>object</code></td>
    <td>NVCF container configuration parameters (wire: nvcfContainerConfiguration)</td>
</tr>
<tr>
    <td><CopyableCode code="nvcf_deployment_specification" /></td>
    <td><code>object</code></td>
    <td>NVCF deployment specification (wire: nvcfDeploymentSpecification)</td>
</tr>
<tr>
    <td><CopyableCode code="other_contents" /></td>
    <td><code>array</code></td>
    <td> (wire: otherContents)</td>
</tr>
<tr>
    <td><CopyableCode code="policy" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="release_type" /></td>
    <td><code>string</code></td>
    <td>Release type enum for the artifact version in the product lifecycle. (BETA, GA, EA, FEATURE, PRODUCTION, LTSB) (wire: releaseType)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Version status (UPLOAD_PENDING, UPLOAD_COMPLETE)</td>
</tr>
<tr>
    <td><CopyableCode code="storage_version" /></td>
    <td><code>string</code></td>
    <td>The storage version i.e. the format the file and their contents are persisted in in object store. Possible values include V1 - for legacy artifact versions with files, V2 - for new artifact versions with blob registry, `` - for artifact versions without any files. (wire: storageVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="total_file_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total file count (wire: totalFileCount)</td>
</tr>
<tr>
    <td><CopyableCode code="total_size_in_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Total size of the model in bytes (wire: totalSizeInBytes)</td>
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
    <td><a href="#list_by_tag_by_team"><CopyableCode code="list_by_tag_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-container_name"><code>container_name</code></a>, <a href="#parameter-container_tag"><code>container_tag</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a></td>
    <td>List associated model versions by container</td>
</tr>
<tr>
    <td><a href="#list_by_tag"><CopyableCode code="list_by_tag" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-container_name"><code>container_name</code></a>, <a href="#parameter-container_tag"><code>container_tag</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a></td>
    <td>List associated model versions by container</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-container_name"><code>container_name</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a></td>
    <td>List associated model versions by container</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-container_name"><code>container_name</code></a></td>
    <td><a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a></td>
    <td>List associated model versions by container</td>
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
<tr id="parameter-container_name">
    <td><CopyableCode code="container_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Container name</td>
</tr>
<tr id="parameter-container_tag">
    <td><CopyableCode code="container_tag" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Container tag</td>
</tr>
<tr id="parameter-team_name">
    <td><CopyableCode code="team_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
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
<tr id="parameter-sort_order">
    <td><CopyableCode code="sort_order" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Sort order</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list_by_tag_by_team"
    values={[
        { label: 'list_by_tag_by_team', value: 'list_by_tag_by_team' },
        { label: 'list_by_tag', value: 'list_by_tag' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list_by_tag_by_team">

List associated model versions by container

```sql
SELECT
id,
version_id,
owner_name,
accuracy_reached,
batch_size,
created_by_user,
created_date,
custom_metrics,
description,
gpu_model,
is_signed,
malware_scan_date,
malware_scan_status,
memory_footprint,
number_of_epochs,
nvcf_container_configuration,
nvcf_deployment_specification,
other_contents,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.private_registry.repository_associated_models
WHERE team_name = '{{ team_name }}' -- required
AND container_name = '{{ container_name }}' -- required
AND container_tag = '{{ container_tag }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
;
```
</TabItem>
<TabItem value="list_by_tag">

List associated model versions by container

```sql
SELECT
id,
version_id,
owner_name,
accuracy_reached,
batch_size,
created_by_user,
created_date,
custom_metrics,
description,
gpu_model,
is_signed,
malware_scan_date,
malware_scan_status,
memory_footprint,
number_of_epochs,
nvcf_container_configuration,
nvcf_deployment_specification,
other_contents,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.private_registry.repository_associated_models
WHERE container_name = '{{ container_name }}' -- required
AND container_tag = '{{ container_tag }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
;
```
</TabItem>
<TabItem value="list_by_team">

List associated model versions by container

```sql
SELECT
id,
version_id,
owner_name,
accuracy_reached,
batch_size,
created_by_user,
created_date,
custom_metrics,
description,
gpu_model,
is_signed,
malware_scan_date,
malware_scan_status,
memory_footprint,
number_of_epochs,
nvcf_container_configuration,
nvcf_deployment_specification,
other_contents,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.private_registry.repository_associated_models
WHERE team_name = '{{ team_name }}' -- required
AND container_name = '{{ container_name }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
;
```
</TabItem>
<TabItem value="list">

List associated model versions by container

```sql
SELECT
id,
version_id,
owner_name,
accuracy_reached,
batch_size,
created_by_user,
created_date,
custom_metrics,
description,
gpu_model,
is_signed,
malware_scan_date,
malware_scan_status,
memory_footprint,
number_of_epochs,
nvcf_container_configuration,
nvcf_deployment_specification,
other_contents,
policy,
release_type,
status,
storage_version,
total_file_count,
total_size_in_bytes,
updated_date
FROM nvidia.private_registry.repository_associated_models
WHERE container_name = '{{ container_name }}' -- required
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
;
```
</TabItem>
</Tabs>
