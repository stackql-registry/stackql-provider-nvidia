--- 
title: function_versions
hide_title: false
hide_table_of_contents: false
keywords:
  - function_versions
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

Creates, updates, deletes, gets or lists a <code>function_versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="function_versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.nvcf_functions.function_versions" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique function id</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function name</td>
</tr>
<tr>
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique function version id (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="helm_chart_service_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Helm Chart Service Name specified only when helmChart property is specified  (wire: helmChartServiceName)</td>
</tr>
<tr>
    <td><CopyableCode code="active_instances" /></td>
    <td><code>array</code></td>
    <td>List of active instances for this function. (wire: activeInstances)</td>
</tr>
<tr>
    <td><CopyableCode code="api_body_format" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Invocation request body format (PREDICT_V2, CUSTOM) (wire: apiBodyFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="container_args" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Args used to launch the container (wire: containerArgs)</td>
</tr>
<tr>
    <td><CopyableCode code="container_environment" /></td>
    <td><code>array</code></td>
    <td>Environment settings used to launch the container (wire: containerEnvironment)</td>
</tr>
<tr>
    <td><CopyableCode code="container_image" /></td>
    <td><code>string (uri)</code></td>
    <td>Optional custom container (wire: containerImage)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Function creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function/version description</td>
</tr>
<tr>
    <td><CopyableCode code="function_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Used to indicate a STREAMING function. Defaults to DEFAULT. (DEFAULT, STREAMING, LLM) (wire: functionType)</td>
</tr>
<tr>
    <td><CopyableCode code="health" /></td>
    <td><code>object</code></td>
    <td>Function health configuration</td>
</tr>
<tr>
    <td><CopyableCode code="health_uri" /></td>
    <td><code>string (uri)</code></td>
    <td>Health endpoint for the container or helmChart. Deprecated, use health.uri instead. (wire: healthUri)</td>
</tr>
<tr>
    <td><CopyableCode code="helm_chart" /></td>
    <td><code>string (uri)</code></td>
    <td>Optional Helm Chart (wire: helmChart)</td>
</tr>
<tr>
    <td><CopyableCode code="inference_port" /></td>
    <td><code>integer (int32)</code></td>
    <td>Optional port number where the inference listener is running - defaults to 8000 for Triton (wire: inferencePort)</td>
</tr>
<tr>
    <td><CopyableCode code="inference_url" /></td>
    <td><code>string (uri)</code></td>
    <td>Entrypoint for invoking the container to process requests (wire: inferenceUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="llm_invocation_config" /></td>
    <td><code>object</code></td>
    <td>Optional function-level LLM invocation configuration. (wire: llmInvocationConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="models" /></td>
    <td><code>array</code></td>
    <td>Optional list of models</td>
</tr>
<tr>
    <td><CopyableCode code="owned_by_different_account" /></td>
    <td><code>boolean</code></td>
    <td>Indicates whether the function is owned by another account. If the account  that is being used to lookup functions happens to be authorized to invoke/list  this function which is owned by a different account, then this field is set  to true and ncaId will contain the id of the account that owns the function.  Otherwise, this field is not set as it defaults to false.  (wire: ownedByDifferentAccount)</td>
</tr>
<tr>
    <td><CopyableCode code="rate_limit" /></td>
    <td><code>object</code></td>
    <td>Optional rate limit policy (wire: rateLimit)</td>
</tr>
<tr>
    <td><CopyableCode code="resources" /></td>
    <td><code>array</code></td>
    <td>Optional set of resources.</td>
</tr>
<tr>
    <td><CopyableCode code="secrets" /></td>
    <td><code>array</code></td>
    <td>Optional secret names</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function status (ACTIVE, DEPLOYING, ERROR, INACTIVE, DELETED, DEGRADED, DEGRADING)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Optional set of tags. Maximum allowed number of tags per function is 64. Maximum length of each tag is 128 chars.</td>
</tr>
<tr>
    <td><CopyableCode code="telemetries" /></td>
    <td><code>object</code></td>
    <td>Optional telemetry configuration for the function</td>
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
    <td>Unique function id</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function name</td>
</tr>
<tr>
    <td><CopyableCode code="nca_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>NVIDIA Cloud Account Id (wire: ncaId)</td>
</tr>
<tr>
    <td><CopyableCode code="version_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique function version id (wire: versionId)</td>
</tr>
<tr>
    <td><CopyableCode code="helm_chart_service_name" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Helm Chart Service Name specified only when helmChart property is specified  (wire: helmChartServiceName)</td>
</tr>
<tr>
    <td><CopyableCode code="active_instances" /></td>
    <td><code>array</code></td>
    <td>List of active instances for this function. (wire: activeInstances)</td>
</tr>
<tr>
    <td><CopyableCode code="api_body_format" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Invocation request body format (PREDICT_V2, CUSTOM) (wire: apiBodyFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="container_args" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Args used to launch the container (wire: containerArgs)</td>
</tr>
<tr>
    <td><CopyableCode code="container_environment" /></td>
    <td><code>array</code></td>
    <td>Environment settings used to launch the container (wire: containerEnvironment)</td>
</tr>
<tr>
    <td><CopyableCode code="container_image" /></td>
    <td><code>string (uri)</code></td>
    <td>Optional custom container (wire: containerImage)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Function creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function/version description</td>
</tr>
<tr>
    <td><CopyableCode code="function_type" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Used to indicate a STREAMING function. Defaults to DEFAULT. (DEFAULT, STREAMING, LLM) (wire: functionType)</td>
</tr>
<tr>
    <td><CopyableCode code="health" /></td>
    <td><code>object</code></td>
    <td>Function health configuration</td>
</tr>
<tr>
    <td><CopyableCode code="health_uri" /></td>
    <td><code>string (uri)</code></td>
    <td>Health endpoint for the container or helmChart. Deprecated, use health.uri instead. (wire: healthUri)</td>
</tr>
<tr>
    <td><CopyableCode code="helm_chart" /></td>
    <td><code>string (uri)</code></td>
    <td>Optional Helm Chart (wire: helmChart)</td>
</tr>
<tr>
    <td><CopyableCode code="inference_port" /></td>
    <td><code>integer (int32)</code></td>
    <td>Optional port number where the inference listener is running - defaults to 8000 for Triton (wire: inferencePort)</td>
</tr>
<tr>
    <td><CopyableCode code="inference_url" /></td>
    <td><code>string (uri)</code></td>
    <td>Entrypoint for invoking the container to process requests (wire: inferenceUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="llm_invocation_config" /></td>
    <td><code>object</code></td>
    <td>Optional function-level LLM invocation configuration. (wire: llmInvocationConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="models" /></td>
    <td><code>array</code></td>
    <td>Optional list of models</td>
</tr>
<tr>
    <td><CopyableCode code="owned_by_different_account" /></td>
    <td><code>boolean</code></td>
    <td>Indicates whether the function is owned by another account. If the account  that is being used to lookup functions happens to be authorized to invoke/list  this function which is owned by a different account, then this field is set  to true and ncaId will contain the id of the account that owns the function.  Otherwise, this field is not set as it defaults to false.  (wire: ownedByDifferentAccount)</td>
</tr>
<tr>
    <td><CopyableCode code="rate_limit" /></td>
    <td><code>object</code></td>
    <td>Optional rate limit policy (wire: rateLimit)</td>
</tr>
<tr>
    <td><CopyableCode code="resources" /></td>
    <td><code>array</code></td>
    <td>Optional set of resources.</td>
</tr>
<tr>
    <td><CopyableCode code="secrets" /></td>
    <td><code>array</code></td>
    <td>Optional secret names</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Function status (ACTIVE, DEPLOYING, ERROR, INACTIVE, DELETED, DEGRADED, DEGRADING)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td>Optional set of tags. Maximum allowed number of tags per function is 64. Maximum length of each tag is 128 chars.</td>
</tr>
<tr>
    <td><CopyableCode code="telemetries" /></td>
    <td><code>object</code></td>
    <td>Optional telemetry configuration for the function</td>
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
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td><a href="#parameter-include_secrets"><code>include_secrets</code></a></td>
    <td>Retrieves detailed information of the specified function version in the  authenticated NVIDIA Cloud Account. Requires a bearer token with  'list_functions' or 'list_functions_details' scopes in the HTTP  Authorization header. </td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a></td>
    <td></td>
    <td>Lists details of all the versions of the specified function in the authenticated  NVIDIA Cloud Account. Requires a bearer token  with 'list_functions' or  'list_functions_details' scopes in the HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-inference_url"><code>inference_url</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Creates a version of the specified function within the authenticated NVIDIA  Cloud Account. If the function is public, then Account Admin cannot create  a version. Requires a bearer token with 'register_function' scope in the  HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td></td>
    <td>Updates mutable fields of the specified function version within the authenticated NVIDIA Cloud Account. The current request payload supports tags updates, rate limit updates, and model-specific LLM config updates. Requires a bearer token with 'update_function' scope in the HTTP Authorization header. </td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-function_id"><code>function_id</code></a>, <a href="#parameter-function_version_id"><code>function_version_id</code></a></td>
    <td></td>
    <td>Deletes the specified function version in the authenticated NVIDIA Cloud  Account. Requires a bearer token with 'delete_function' scope in the HTTP  Authorization header. If the function version is public, then Account Admin  cannot delete the function. </td>
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
    <td>Version id</td>
</tr>
<tr id="parameter-include_secrets">
    <td><CopyableCode code="include_secrets" /></td>
    <td><code>boolean</code></td>
    <td>Query param 'includeSecrets' indicates whether to include secret names  for the function in the response.  (wire: includeSecrets)</td>
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

Retrieves detailed information of the specified function version in the  authenticated NVIDIA Cloud Account. Requires a bearer token with  'list_functions' or 'list_functions_details' scopes in the HTTP  Authorization header. 

```sql
SELECT
id,
name,
nca_id,
version_id,
helm_chart_service_name,
active_instances,
api_body_format,
container_args,
container_environment,
container_image,
created_at,
description,
function_type,
health,
health_uri,
helm_chart,
inference_port,
inference_url,
llm_invocation_config,
models,
owned_by_different_account,
rate_limit,
resources,
secrets,
status,
tags,
telemetries
FROM nvidia.nvcf_functions.function_versions
WHERE function_id = '{{ function_id }}' -- required
AND function_version_id = '{{ function_version_id }}' -- required
AND include_secrets = '{{ include_secrets }}'
;
```
</TabItem>
<TabItem value="list">

Lists details of all the versions of the specified function in the authenticated  NVIDIA Cloud Account. Requires a bearer token  with 'list_functions' or  'list_functions_details' scopes in the HTTP Authorization header. 

```sql
SELECT
id,
name,
nca_id,
version_id,
helm_chart_service_name,
active_instances,
api_body_format,
container_args,
container_environment,
container_image,
created_at,
description,
function_type,
health,
health_uri,
helm_chart,
inference_port,
inference_url,
llm_invocation_config,
models,
owned_by_different_account,
rate_limit,
resources,
secrets,
status,
tags,
telemetries
FROM nvidia.nvcf_functions.function_versions
WHERE function_id = '{{ function_id }}' -- required
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

Creates a version of the specified function within the authenticated NVIDIA  Cloud Account. If the function is public, then Account Admin cannot create  a version. Requires a bearer token with 'register_function' scope in the  HTTP Authorization header. 

```sql
INSERT INTO nvidia.nvcf_functions.function_versions (
api_body_format,
container_args,
container_environment,
container_image,
description,
function_type,
health,
health_uri,
helm_chart,
helm_chart_service_name,
inference_port,
inference_url,
llm_invocation_config,
models,
name,
rate_limit,
resources,
secrets,
tags,
telemetries,
function_id
)
SELECT 
'{{ api_body_format }}',
'{{ container_args }}',
'{{ container_environment }}',
'{{ container_image }}',
'{{ description }}',
'{{ function_type }}',
'{{ health }}',
'{{ health_uri }}',
'{{ helm_chart }}',
'{{ helm_chart_service_name }}',
{{ inference_port }},
'{{ inference_url }}' /* required */,
'{{ llm_invocation_config }}',
'{{ models }}',
'{{ name }}' /* required */,
'{{ rate_limit }}',
'{{ resources }}',
'{{ secrets }}',
'{{ tags }}',
'{{ telemetries }}',
'{{ function_id }}'
RETURNING
function
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: function_versions
  props:
    - name: function_id
      value: "{{ function_id }}"
      description: Required parameter for the function_versions resource.
    - name: api_body_format
      value: "{{ api_body_format }}"
      description: |
        Invocation request body format
      valid_values: ['PREDICT_V2', 'CUSTOM']
    - name: container_args
      value: "{{ container_args }}"
      description: |
        Args to be passed when launching the container
    - name: container_environment
      description: |
        Environment settings for launching the container
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: container_image
      value: "{{ container_image }}"
      description: |
        Optional custom container image
    - name: description
      value: "{{ description }}"
      description: |
        Optional function/version description
    - name: function_type
      value: "{{ function_type }}"
      description: |
        Optional function type, used to indicate a STREAMING function. Defaults to DEFAULT.
      valid_values: ['DEFAULT', 'STREAMING', 'LLM']
    - name: health
      description: |
        Function health
      value:
        expectedStatusCode: {{ expectedStatusCode }}
        port: {{ port }}
        protocol: "{{ protocol }}"
        timeout: "{{ timeout }}"
        uri: "{{ uri }}"
    - name: health_uri
      value: "{{ health_uri }}"
      description: |
        Health endpoint for the container or the helmChart
    - name: helm_chart
      value: "{{ helm_chart }}"
      description: |
        Optional Helm Chart
    - name: helm_chart_service_name
      value: "{{ helm_chart_service_name }}"
      description: |
        Helm Chart Service Name is required when helmChart property is specified
    - name: inference_port
      value: {{ inference_port }}
      description: |
        Optional port number where the inference listener is running. Defaults to 8000
        for Triton.
    - name: inference_url
      value: "{{ inference_url }}"
      description: |
        Entrypoint for invoking the container to process a request
    - name: llm_invocation_config
      description: |
        Optional function-level LLM invocation configuration. Only valid for LLM-type functions.
      value:
        priority:
          defaultPriority: {{ defaultPriority }}
          perAccountPriority: "{{ perAccountPriority }}"
    - name: models
      description: |
        Optional list of models
      value:
        - llmConfig:
            routingMethod: "{{ routingMethod }}"
            tokenRateLimit: "{{ tokenRateLimit }}"
            tokenizer: "{{ tokenizer }}"
            uris:
              - "{{ uris }}"
          name: "{{ name }}"
          uri: "{{ uri }}"
          version: "{{ version }}"
    - name: name
      value: "{{ name }}"
      description: |
        Function name must start with lowercase/uppercase/digit and can only contain lowercase, uppercase, digit, hyphen, and underscore characters
    - name: rate_limit
      description: |
        Optional rate limit config
      value:
        exemptedNcaIds:
          - "{{ exemptedNcaIds }}"
        perNcaIdRate: "{{ perNcaIdRate }}"
        perUserRate: "{{ perUserRate }}"
        rateLimit: "{{ rateLimit }}"
        syncCheck: {{ syncCheck }}
    - name: resources
      description: |
        Optional set of resources
      value:
        - name: "{{ name }}"
          uri: "{{ uri }}"
          version: "{{ version }}"
    - name: secrets
      description: |
        Optional secrets
      value:
        - name: "{{ name }}"
          value: "{{ value }}"
    - name: tags
      value:
        - "{{ tags }}"
      description: |
        Optional set of tags - could be empty. Provided by user
    - name: telemetries
      description: |
        Optional telemetry configuration for logs, metrics, and traces.
      value:
        logsTelemetryId: "{{ logsTelemetryId }}"
        metricsTelemetryId: "{{ metricsTelemetryId }}"
        tracesTelemetryId: "{{ tracesTelemetryId }}"
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

Updates mutable fields of the specified function version within the authenticated NVIDIA Cloud Account. The current request payload supports tags updates, rate limit updates, and model-specific LLM config updates. Requires a bearer token with 'update_function' scope in the HTTP Authorization header. 

```sql
UPDATE nvidia.nvcf_functions.function_versions
SET 
llm_invocation_config = '{{ llm_invocation_config }}',
model_updates = '{{ model_updates }}',
rate_limit = '{{ rate_limit }}',
tags = '{{ tags }}'
WHERE 
function_id = '{{ function_id }}' --required
AND function_version_id = '{{ function_version_id }}' --required
RETURNING
function;
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

Deletes the specified function version in the authenticated NVIDIA Cloud  Account. Requires a bearer token with 'delete_function' scope in the HTTP  Authorization header. If the function version is public, then Account Admin  cannot delete the function. 

```sql
DELETE FROM nvidia.nvcf_functions.function_versions
WHERE function_id = '{{ function_id }}' --required
AND function_version_id = '{{ function_version_id }}' --required
;
```
</TabItem>
</Tabs>
