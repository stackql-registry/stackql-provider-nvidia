--- 
title: workflows
hide_title: false
hide_table_of_contents: false
keywords:
  - workflows
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

Creates, updates, deletes, gets or lists a <code>workflows</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workflows" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.private_registry.workflows" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' }
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
    <td><CopyableCode code="clone_status" /></td>
    <td><code>object</code></td>
    <td>Progress of cloning artifact version files (wire: cloneStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="duration" /></td>
    <td><code>string</code></td>
    <td>Wall-clock execution duration as an ISO-8601 duration (e.g. PT1H30M5S, PT0.001S); Omitted while IN_PROGRESS.</td>
</tr>
<tr>
    <td><CopyableCode code="end_time" /></td>
    <td><code>string (date_time)</code></td>
    <td>UTC instant when the workflow reached a closed state; omitted while IN_PROGRESS. (wire: endTime)</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td>Human-readable message about the workflow status</td>
</tr>
<tr>
    <td><CopyableCode code="request_status" /></td>
    <td><code>object</code></td>
    <td>Request status information (wire: requestStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="start_time" /></td>
    <td><code>string (date_time)</code></td>
    <td>UTC instant when the workflow execution started. (wire: startTime)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Current status of the workflow (IN_PROGRESS, COMPLETED, FAILED, CANCELED, TERMINATED, CONTINUED_AS_NEW, TIMED_OUT, UNKNOWN)</td>
</tr>
<tr>
    <td><CopyableCode code="workflow_type" /></td>
    <td><code>string</code></td>
    <td>Workflow type. (CLONE, CUSTOMER_MANAGED_KEY) (wire: workflowType)</td>
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
    <td><CopyableCode code="clone_status" /></td>
    <td><code>object</code></td>
    <td>Progress of cloning artifact version files (wire: cloneStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="duration" /></td>
    <td><code>string</code></td>
    <td>Wall-clock execution duration as an ISO-8601 duration (e.g. PT1H30M5S, PT0.001S); Omitted while IN_PROGRESS.</td>
</tr>
<tr>
    <td><CopyableCode code="end_time" /></td>
    <td><code>string (date_time)</code></td>
    <td>UTC instant when the workflow reached a closed state; omitted while IN_PROGRESS. (wire: endTime)</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td>Human-readable message about the workflow status</td>
</tr>
<tr>
    <td><CopyableCode code="request_status" /></td>
    <td><code>object</code></td>
    <td>Request status information (wire: requestStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="start_time" /></td>
    <td><code>string (date_time)</code></td>
    <td>UTC instant when the workflow execution started. (wire: startTime)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>Current status of the workflow (IN_PROGRESS, COMPLETED, FAILED, CANCELED, TERMINATED, CONTINUED_AS_NEW, TIMED_OUT, UNKNOWN)</td>
</tr>
<tr>
    <td><CopyableCode code="workflow_type" /></td>
    <td><code>string</code></td>
    <td>Workflow type. (CLONE, CUSTOMER_MANAGED_KEY) (wire: workflowType)</td>
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
    <td><a href="#parameter-team"><code>team</code></a>, <a href="#parameter-workflow_id"><code>workflow_id</code></a></td>
    <td></td>
    <td>Returns the current status (pending, running, completed, or failed) of an artifact-registry Temporal workflow execution within the specified organization and team.</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-workflow_id"><code>workflow_id</code></a></td>
    <td></td>
    <td>Returns the current status (pending, running, completed, or failed) of an artifact-registry Temporal workflow execution within the specified organization.</td>
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
<tr id="parameter-team">
    <td><CopyableCode code="team" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Team name</td>
</tr>
<tr id="parameter-workflow_id">
    <td><CopyableCode code="workflow_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>Workflow identifier</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_team"
    values={[
        { label: 'get_by_team', value: 'get_by_team' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get_by_team">

Returns the current status (pending, running, completed, or failed) of an artifact-registry Temporal workflow execution within the specified organization and team.

```sql
SELECT
clone_status,
duration,
end_time,
message,
request_status,
start_time,
status,
workflow_type
FROM nvidia.private_registry.workflows
WHERE team = '{{ team }}' -- required
AND workflow_id = '{{ workflow_id }}' -- required
;
```
</TabItem>
<TabItem value="get">

Returns the current status (pending, running, completed, or failed) of an artifact-registry Temporal workflow execution within the specified organization.

```sql
SELECT
clone_status,
duration,
end_time,
message,
request_status,
start_time,
status,
workflow_type
FROM nvidia.private_registry.workflows
WHERE workflow_id = '{{ workflow_id }}' -- required
;
```
</TabItem>
</Tabs>
