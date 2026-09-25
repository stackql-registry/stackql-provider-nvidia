--- 
title: model_versions
hide_title: false
hide_table_of_contents: false
keywords:
  - model_versions
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

Creates, updates, deletes, gets or lists a <code>model_versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="model_versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.model_versions" /></td></tr>
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
    <td><a href="#get_by_team"><CopyableCode code="get_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td></td>
    <td>Get model version in team</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td></td>
    <td>Get model version in org</td>
</tr>
<tr>
    <td><a href="#list_by_team"><CopyableCode code="list_by_team" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a></td>
    <td><a href="#parameter-release_type"><code>release_type</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a></td>
    <td>List model versions in team</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a></td>
    <td><a href="#parameter-release_type"><code>release_type</code></a>, <a href="#parameter-page_size"><code>page_size</code></a>, <a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-sort_order"><code>sort_order</code></a></td>
    <td>List model versions in org</td>
</tr>
<tr>
    <td><a href="#create_by_team"><CopyableCode code="create_by_team" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>Create model version in team. Please use the string versionId and not the deprecated numeric id. Semantic Versioning is recommended https:​//semver.org</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a></td>
    <td></td>
    <td>Create a new and empty model version in org. Please use the string versionId and not the deprecated numeric id. Semantic Versioning is recommended https:​//semver.org</td>
</tr>
<tr>
    <td><a href="#update_by_team"><CopyableCode code="update_by_team" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td><a href="#parameter-create_zip"><code>create_zip</code></a>, <a href="#parameter-set_latest"><code>set_latest</code></a></td>
    <td>Update model version information in team e.g. upload status</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-model_name"><code>model_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td><a href="#parameter-create_zip"><code>create_zip</code></a>, <a href="#parameter-set_latest"><code>set_latest</code></a></td>
    <td>Update model version information in org e.g. upload status</td>
</tr>
<tr>
    <td><a href="#stash"><CopyableCode code="stash" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td></td>
    <td>Stash artifact version information in org during upload paused state</td>
</tr>
<tr>
    <td><a href="#stash_by_team"><CopyableCode code="stash_by_team" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-team_name"><code>team_name</code></a>, <a href="#parameter-artifact_name"><code>artifact_name</code></a>, <a href="#parameter-version_id"><code>version_id</code></a></td>
    <td></td>
    <td>Stash artifact version information in team in model version upload paused state</td>
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
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Version ID</td>
</tr>
<tr id="parameter-create_zip">
    <td><CopyableCode code="create_zip" /></td>
    <td><code>boolean</code></td>
    <td>Create zip of version content</td>
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
<tr id="parameter-release_type">
    <td><CopyableCode code="release_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Release Type</td>
</tr>
<tr id="parameter-set_latest">
    <td><CopyableCode code="set_latest" /></td>
    <td><code>boolean</code></td>
    <td>Set version to latest</td>
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
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' },
        { label: 'list_by_team', value: 'list_by_team' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_team">

Get model version in team

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
FROM nvidia.private_registry.model_versions
WHERE team_name = '{{ team_name }}' -- required
AND model_name = '{{ model_name }}' -- required
AND version_id = '{{ version_id }}' -- required
;
```
</TabItem>
<TabItem value="get">

Get model version in org

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
FROM nvidia.private_registry.model_versions
WHERE model_name = '{{ model_name }}' -- required
AND version_id = '{{ version_id }}' -- required
;
```
</TabItem>
<TabItem value="list_by_team">

List model versions in team

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
FROM nvidia.private_registry.model_versions
WHERE team_name = '{{ team_name }}' -- required
AND model_name = '{{ model_name }}' -- required
AND release_type = '{{ release_type }}'
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
;
```
</TabItem>
<TabItem value="list">

List model versions in org

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
FROM nvidia.private_registry.model_versions
WHERE model_name = '{{ model_name }}' -- required
AND release_type = '{{ release_type }}'
AND page_size = '{{ page_size }}'
AND page_number = '{{ page_number }}'
AND sort_order = '{{ sort_order }}'
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

Create model version in team. Please use the string versionId and not the deprecated numeric id. Semantic Versioning is recommended https://semver.org

```sql
INSERT INTO nvidia.private_registry.model_versions (
accuracy_reached,
batch_size,
custom_metrics,
description,
gpu_model,
id,
memory_footprint,
number_of_epochs,
nvcf_container_configuration,
nvcf_deployment_specification,
other_contents,
owner_name,
version_id,
team_name,
model_name
)
SELECT 
{{ accuracy_reached }},
{{ batch_size }},
'{{ custom_metrics }}',
'{{ description }}',
'{{ gpu_model }}',
{{ id }},
'{{ memory_footprint }}',
{{ number_of_epochs }},
'{{ nvcf_container_configuration }}',
'{{ nvcf_deployment_specification }}',
'{{ other_contents }}',
'{{ owner_name }}',
'{{ version_id }}',
'{{ team_name }}',
'{{ model_name }}'
RETURNING
model,
model_version,
request_status
;
```
</TabItem>
<TabItem value="create">

Create a new and empty model version in org. Please use the string versionId and not the deprecated numeric id. Semantic Versioning is recommended https://semver.org

```sql
INSERT INTO nvidia.private_registry.model_versions (
accuracy_reached,
batch_size,
custom_metrics,
description,
gpu_model,
id,
memory_footprint,
number_of_epochs,
nvcf_container_configuration,
nvcf_deployment_specification,
other_contents,
owner_name,
version_id,
model_name
)
SELECT 
{{ accuracy_reached }},
{{ batch_size }},
'{{ custom_metrics }}',
'{{ description }}',
'{{ gpu_model }}',
{{ id }},
'{{ memory_footprint }}',
{{ number_of_epochs }},
'{{ nvcf_container_configuration }}',
'{{ nvcf_deployment_specification }}',
'{{ other_contents }}',
'{{ owner_name }}',
'{{ version_id }}',
'{{ model_name }}'
RETURNING
model,
model_version,
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: model_versions
  props:
    - name: team_name
      value: "{{ team_name }}"
      description: Required parameter for the model_versions resource.
    - name: model_name
      value: "{{ model_name }}"
      description: Required parameter for the model_versions resource.
    - name: accuracy_reached
      value: {{ accuracy_reached }}
      description: |
        Accuracy this model reached
    - name: batch_size
      value: {{ batch_size }}
      description: |
        Batch size this model was trained with
    - name: custom_metrics
      value:
        - attributes: "{{ attributes }}"
          name: "{{ name }}"
    - name: description
      value: "{{ description }}"
      description: |
        Description of the model version
    - name: gpu_model
      value: "{{ gpu_model }}"
      description: |
        GPU model and memory
    - name: id
      value: {{ id }}
      description: |
        Deprecated: Please use version instead. Unique ID of the version
    - name: memory_footprint
      value: "{{ memory_footprint }}"
      description: |
        Model size/memory footprint for inference
    - name: number_of_epochs
      value: {{ number_of_epochs }}
      description: |
        Number of epochs this model trained
    - name: nvcf_container_configuration
      description: |
        NVCF container configuration parameters
      value:
        apiBodyFormat: "{{ apiBodyFormat }}"
        containerArgs: "{{ containerArgs }}"
        containerEnvironment:
          - key: "{{ key }}"
            value: "{{ value }}"
        containerImage: "{{ containerImage }}"
        healthUri: "{{ healthUri }}"
        inferencePort: "{{ inferencePort }}"
        inferenceUrl: "{{ inferenceUrl }}"
        models:
          - name: "{{ name }}"
            uri: "{{ uri }}"
            version: "{{ version }}"
    - name: nvcf_deployment_specification
      description: |
        NVCF deployment specification
      value:
        gpuCount: {{ gpuCount }}
        gpuType: "{{ gpuType }}"
        instanceType: "{{ instanceType }}"
        maxConcurrency: {{ maxConcurrency }}
    - name: other_contents
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: owner_name
      value: "{{ owner_name }}"
      description: |
        Name of the user who owns this version
    - name: version_id
      value: "{{ version_id }}"
      description: |
        Unique version id. Please use this instead of 'id'
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

Update model version information in team e.g. upload status

```sql
UPDATE nvidia.private_registry.model_versions
SET 
accuracy_reached = {{ accuracy_reached }},
batch_size = {{ batch_size }},
custom_metrics = '{{ custom_metrics }}',
description = '{{ description }}',
gpu_model = '{{ gpu_model }}',
memory_footprint = '{{ memory_footprint }}',
number_of_epochs = {{ number_of_epochs }},
nvcf_container_configuration = '{{ nvcf_container_configuration }}',
nvcf_deployment_specification = '{{ nvcf_deployment_specification }}',
other_contents = '{{ other_contents }}',
owner_name = '{{ owner_name }}',
status = '{{ status }}'
WHERE 
team_name = '{{ team_name }}' --required
AND model_name = '{{ model_name }}' --required
AND version_id = '{{ version_id }}' --required
AND create-zip = {{ create-zip}}
AND set-latest = {{ set-latest}}
RETURNING
model,
model_version,
request_status;
```
</TabItem>
<TabItem value="update">

Update model version information in org e.g. upload status

```sql
UPDATE nvidia.private_registry.model_versions
SET 
accuracy_reached = {{ accuracy_reached }},
batch_size = {{ batch_size }},
custom_metrics = '{{ custom_metrics }}',
description = '{{ description }}',
gpu_model = '{{ gpu_model }}',
memory_footprint = '{{ memory_footprint }}',
number_of_epochs = {{ number_of_epochs }},
nvcf_container_configuration = '{{ nvcf_container_configuration }}',
nvcf_deployment_specification = '{{ nvcf_deployment_specification }}',
other_contents = '{{ other_contents }}',
owner_name = '{{ owner_name }}',
status = '{{ status }}'
WHERE 
model_name = '{{ model_name }}' --required
AND version_id = '{{ version_id }}' --required
AND create-zip = {{ create-zip}}
AND set-latest = {{ set-latest}}
RETURNING
model,
model_version,
request_status;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="stash"
    values={[
        { label: 'stash', value: 'stash' },
        { label: 'stash_by_team', value: 'stash_by_team' }
    ]}
>
<TabItem value="stash">

Stash artifact version information in org during upload paused state

```sql
EXEC nvidia.private_registry.model_versions.stash 
@artifact_name='{{ artifact_name }}' --required, 
@version_id='{{ version_id }}' --required
;
```
</TabItem>
<TabItem value="stash_by_team">

Stash artifact version information in team in model version upload paused state

```sql
EXEC nvidia.private_registry.model_versions.stash_by_team 
@team_name='{{ team_name }}' --required, 
@artifact_name='{{ artifact_name }}' --required, 
@version_id='{{ version_id }}' --required
;
```
</TabItem>
</Tabs>
