--- 
title: gpus
hide_title: false
hide_table_of_contents: false
keywords:
  - gpus
  - catalog
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

Creates, updates, deletes, gets or lists a <code>gpus</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="gpus" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.catalog.gpus" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_vendor_subsystem"
    values={[
        { label: 'get_by_vendor_subsystem', value: 'get_by_vendor_subsystem' },
        { label: 'get_by_vendor', value: 'get_by_vendor' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_vendor_subsystem">

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
    <td><CopyableCode code="pci_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Device ID (wire: pciDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_subsystem_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Subsystem Device ID (wire: pciSubsystemDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_vendor_id" /></td>
    <td><code>string</code></td>
    <td>PCI Vendor ID (wire: pciVendorId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name for the GPU (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="label_name" /></td>
    <td><code>string</code></td>
    <td>Label name for the GPU (wire: labelName)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_major_version" /></td>
    <td><code>string</code></td>
    <td>CUDA major version (wire: cudaMajorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_minor_version" /></td>
    <td><code>string</code></td>
    <td>CUDA minor version (wire: cudaMinorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="form_factor" /></td>
    <td><code>string</code></td>
    <td>GPU form factor (wire: formFactor)</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_counts" /></td>
    <td><code>array</code></td>
    <td> (wire: gpuCounts)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_size_gb" /></td>
    <td><code>integer (int32)</code></td>
    <td>Memory size in GB (smallint range) (wire: memorySizeGb)</td>
</tr>
<tr>
    <td><CopyableCode code="request_status" /></td>
    <td><code>object</code></td>
    <td>Request status information (wire: requestStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Last update timestamp (wire: updatedAt)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="get_by_vendor">

Response for GPU by PCI ID lookup

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
    <td><CopyableCode code="pci_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Device ID (wire: pciDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_subsystem_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Subsystem Device ID (wire: pciSubsystemDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_vendor_id" /></td>
    <td><code>string</code></td>
    <td>PCI Vendor ID (wire: pciVendorId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name for the GPU (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="label_name" /></td>
    <td><code>string</code></td>
    <td>Label name for the GPU (wire: labelName)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_major_version" /></td>
    <td><code>string</code></td>
    <td>CUDA major version (wire: cudaMajorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_minor_version" /></td>
    <td><code>string</code></td>
    <td>CUDA minor version (wire: cudaMinorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="form_factor" /></td>
    <td><code>string</code></td>
    <td>GPU form factor (wire: formFactor)</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_counts" /></td>
    <td><code>array</code></td>
    <td> (wire: gpuCounts)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_size_gb" /></td>
    <td><code>integer (int32)</code></td>
    <td>Memory size in GB (smallint range) (wire: memorySizeGb)</td>
</tr>
<tr>
    <td><CopyableCode code="request_status" /></td>
    <td><code>object</code></td>
    <td>Request status information (wire: requestStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Last update timestamp (wire: updatedAt)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="get">

Response for GPU by PCI ID lookup

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
    <td><CopyableCode code="pci_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Device ID (wire: pciDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_subsystem_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Subsystem Device ID (wire: pciSubsystemDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_vendor_id" /></td>
    <td><code>string</code></td>
    <td>PCI Vendor ID (wire: pciVendorId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name for the GPU (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="label_name" /></td>
    <td><code>string</code></td>
    <td>Label name for the GPU (wire: labelName)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_major_version" /></td>
    <td><code>string</code></td>
    <td>CUDA major version (wire: cudaMajorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_minor_version" /></td>
    <td><code>string</code></td>
    <td>CUDA minor version (wire: cudaMinorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="form_factor" /></td>
    <td><code>string</code></td>
    <td>GPU form factor (wire: formFactor)</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_counts" /></td>
    <td><code>array</code></td>
    <td> (wire: gpuCounts)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_size_gb" /></td>
    <td><code>integer (int32)</code></td>
    <td>Memory size in GB (smallint range) (wire: memorySizeGb)</td>
</tr>
<tr>
    <td><CopyableCode code="request_status" /></td>
    <td><code>object</code></td>
    <td>Request status information (wire: requestStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Last update timestamp (wire: updatedAt)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Response for GPU by PCI ID lookup

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
    <td><CopyableCode code="pci_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Device ID (wire: pciDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_subsystem_device_id" /></td>
    <td><code>string</code></td>
    <td>PCI Subsystem Device ID (wire: pciSubsystemDeviceId)</td>
</tr>
<tr>
    <td><CopyableCode code="pci_vendor_id" /></td>
    <td><code>string</code></td>
    <td>PCI Vendor ID (wire: pciVendorId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Display name for the GPU (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="label_name" /></td>
    <td><code>string</code></td>
    <td>Label name for the GPU (wire: labelName)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Creation timestamp (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_major_version" /></td>
    <td><code>string</code></td>
    <td>CUDA major version (wire: cudaMajorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="cuda_minor_version" /></td>
    <td><code>string</code></td>
    <td>CUDA minor version (wire: cudaMinorVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="form_factor" /></td>
    <td><code>string</code></td>
    <td>GPU form factor (wire: formFactor)</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_counts" /></td>
    <td><code>array</code></td>
    <td> (wire: gpuCounts)</td>
</tr>
<tr>
    <td><CopyableCode code="memory_size_gb" /></td>
    <td><code>integer (int32)</code></td>
    <td>Memory size in GB (smallint range) (wire: memorySizeGb)</td>
</tr>
<tr>
    <td><CopyableCode code="request_status" /></td>
    <td><code>object</code></td>
    <td>Request status information (wire: requestStatus)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date_time)</code></td>
    <td>Last update timestamp (wire: updatedAt)</td>
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
    <td><a href="#get_by_vendor_subsystem"><CopyableCode code="get_by_vendor_subsystem" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a>, <a href="#parameter-pci_vendor_id"><code>pci_vendor_id</code></a>, <a href="#parameter-pci_subsystem_device_id"><code>pci_subsystem_device_id</code></a></td>
    <td></td>
    <td>Get a single GPU record matching the full PCI composite key</td>
</tr>
<tr>
    <td><a href="#get_by_vendor"><CopyableCode code="get_by_vendor" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a>, <a href="#parameter-pci_vendor_id"><code>pci_vendor_id</code></a></td>
    <td></td>
    <td>Get all GPUs by PCI records matching the given PCI Device ID and Vendor ID</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a></td>
    <td></td>
    <td>Get all GPU records matching the given PCI Device ID</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td></td>
    <td>Get all GPU by PCI records</td>
</tr>
<tr>
    <td><a href="#create_by_vendor_subsystem"><CopyableCode code="create_by_vendor_subsystem" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a>, <a href="#parameter-pci_vendor_id"><code>pci_vendor_id</code></a>, <a href="#parameter-pci_subsystem_device_id"><code>pci_subsystem_device_id</code></a>, <a href="#parameter-display_name"><code>display_name</code></a>, <a href="#parameter-pci_device_id"><code>pci_device_id</code></a></td>
    <td></td>
    <td>Create a new GPU record using the full PCI composite key</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a>, <a href="#parameter-display_name"><code>display_name</code></a>, <a href="#parameter-pci_device_id"><code>pci_device_id</code></a></td>
    <td></td>
    <td>Create a new GPU record using only PCI Device ID (pciVendorId and pciSubsystemDeviceId default to 'unknown')</td>
</tr>
<tr>
    <td><a href="#update_by_vendor_subsystem"><CopyableCode code="update_by_vendor_subsystem" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a>, <a href="#parameter-pci_vendor_id"><code>pci_vendor_id</code></a>, <a href="#parameter-pci_subsystem_device_id"><code>pci_subsystem_device_id</code></a></td>
    <td></td>
    <td>Partially update a GPU record matching the full PCI composite key. Only provided fields will be updated.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a></td>
    <td></td>
    <td>Partially update a GPU record using only PCI Device ID (pciVendorId and pciSubsystemDeviceId default to 'unknown'). Only provided fields will be updated.</td>
</tr>
<tr>
    <td><a href="#delete_by_vendor_subsystem"><CopyableCode code="delete_by_vendor_subsystem" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a>, <a href="#parameter-pci_vendor_id"><code>pci_vendor_id</code></a>, <a href="#parameter-pci_subsystem_device_id"><code>pci_subsystem_device_id</code></a></td>
    <td></td>
    <td>Delete a GPU record matching the full PCI composite key</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-pci_device_id"><code>pci_device_id</code></a></td>
    <td></td>
    <td>Delete a GPU record using only PCI Device ID (pciVendorId and pciSubsystemDeviceId default to 'unknown')</td>
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
<tr id="parameter-pci_device_id">
    <td><CopyableCode code="pci_device_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>PCI Device ID</td>
</tr>
<tr id="parameter-pci_subsystem_device_id">
    <td><CopyableCode code="pci_subsystem_device_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>PCI Subsystem Device ID</td>
</tr>
<tr id="parameter-pci_vendor_id">
    <td><CopyableCode code="pci_vendor_id" /></td>
    <td><code>string (UTF-8)</code></td>
    <td>PCI Vendor ID</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_vendor_subsystem"
    values={[
        { label: 'get_by_vendor_subsystem', value: 'get_by_vendor_subsystem' },
        { label: 'get_by_vendor', value: 'get_by_vendor' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_vendor_subsystem">

Get a single GPU record matching the full PCI composite key

```sql
SELECT
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at
FROM nvidia.catalog.gpus
WHERE pci_device_id = '{{ pci_device_id }}' -- required
AND pci_vendor_id = '{{ pci_vendor_id }}' -- required
AND pci_subsystem_device_id = '{{ pci_subsystem_device_id }}' -- required
;
```
</TabItem>
<TabItem value="get_by_vendor">

Get all GPUs by PCI records matching the given PCI Device ID and Vendor ID

```sql
SELECT
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at
FROM nvidia.catalog.gpus
WHERE pci_device_id = '{{ pci_device_id }}' -- required
AND pci_vendor_id = '{{ pci_vendor_id }}' -- required
;
```
</TabItem>
<TabItem value="get">

Get all GPU records matching the given PCI Device ID

```sql
SELECT
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at
FROM nvidia.catalog.gpus
WHERE pci_device_id = '{{ pci_device_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Get all GPU by PCI records

```sql
SELECT
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at
FROM nvidia.catalog.gpus
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create_by_vendor_subsystem"
    values={[
        { label: 'create_by_vendor_subsystem', value: 'create_by_vendor_subsystem' },
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create_by_vendor_subsystem">

Create a new GPU record using the full PCI composite key

```sql
INSERT INTO nvidia.catalog.gpus (
cuda_major_version,
cuda_minor_version,
display_name,
form_factor,
gpu_counts,
label_name,
memory_size_gb,
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
pci_device_id,
pci_vendor_id,
pci_subsystem_device_id
)
SELECT 
'{{ cuda_major_version }}',
'{{ cuda_minor_version }}',
'{{ display_name }}' /* required */,
'{{ form_factor }}',
'{{ gpu_counts }}',
'{{ label_name }}',
{{ memory_size_gb }},
'{{ pci_device_id }}' /* required */,
'{{ pci_subsystem_device_id }}',
'{{ pci_vendor_id }}',
'{{ pci_device_id }}' /* required */,
'{{ pci_vendor_id }}',
'{{ pci_subsystem_device_id }}'
RETURNING
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at
;
```
</TabItem>
<TabItem value="create">

Create a new GPU record using only PCI Device ID (pciVendorId and pciSubsystemDeviceId default to 'unknown')

```sql
INSERT INTO nvidia.catalog.gpus (
cuda_major_version,
cuda_minor_version,
display_name,
form_factor,
gpu_counts,
label_name,
memory_size_gb,
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
pci_device_id
)
SELECT 
'{{ cuda_major_version }}',
'{{ cuda_minor_version }}',
'{{ display_name }}' /* required */,
'{{ form_factor }}',
'{{ gpu_counts }}',
'{{ label_name }}',
{{ memory_size_gb }},
'{{ pci_device_id }}' /* required */,
'{{ pci_subsystem_device_id }}',
'{{ pci_vendor_id }}',
'{{ pci_device_id }}' /* required */
RETURNING
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: gpus
  props:
    - name: pci_device_id
      value: "{{ pci_device_id }}"
      description: Required parameter for the gpus resource.
    - name: pci_vendor_id
      value: "{{ pci_vendor_id }}"
      description: Required parameter for the gpus resource.
    - name: pci_subsystem_device_id
      value: "{{ pci_subsystem_device_id }}"
      description: Required parameter for the gpus resource.
    - name: cuda_major_version
      value: "{{ cuda_major_version }}"
      description: |
        CUDA major version
    - name: cuda_minor_version
      value: "{{ cuda_minor_version }}"
      description: |
        CUDA minor version
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Display name for the GPU
    - name: form_factor
      value: "{{ form_factor }}"
      description: |
        GPU form factor
    - name: gpu_counts
      value:
        - {{ gpu_counts }}
    - name: label_name
      value: "{{ label_name }}"
      description: |
        Label name for the GPU
    - name: memory_size_gb
      value: {{ memory_size_gb }}
      description: |
        Memory size in GB (smallint range)
    - name: pci_device_id
      value: "{{ pci_device_id }}"
      description: |
        PCI Device ID
    - name: pci_subsystem_device_id
      value: "{{ pci_subsystem_device_id }}"
      description: |
        PCI Subsystem Device ID
    - name: pci_vendor_id
      value: "{{ pci_vendor_id }}"
      description: |
        PCI Vendor ID
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update_by_vendor_subsystem"
    values={[
        { label: 'update_by_vendor_subsystem', value: 'update_by_vendor_subsystem' },
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update_by_vendor_subsystem">

Partially update a GPU record matching the full PCI composite key. Only provided fields will be updated.

```sql
UPDATE nvidia.catalog.gpus
SET 
cuda_major_version = '{{ cuda_major_version }}',
cuda_minor_version = '{{ cuda_minor_version }}',
display_name = '{{ display_name }}',
form_factor = '{{ form_factor }}',
gpu_counts = '{{ gpu_counts }}',
label_name = '{{ label_name }}',
memory_size_gb = {{ memory_size_gb }}
WHERE 
pci_device_id = '{{ pci_device_id }}' --required
AND pci_vendor_id = '{{ pci_vendor_id }}' --required
AND pci_subsystem_device_id = '{{ pci_subsystem_device_id }}' --required
RETURNING
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at;
```
</TabItem>
<TabItem value="update">

Partially update a GPU record using only PCI Device ID (pciVendorId and pciSubsystemDeviceId default to 'unknown'). Only provided fields will be updated.

```sql
UPDATE nvidia.catalog.gpus
SET 
cuda_major_version = '{{ cuda_major_version }}',
cuda_minor_version = '{{ cuda_minor_version }}',
display_name = '{{ display_name }}',
form_factor = '{{ form_factor }}',
gpu_counts = '{{ gpu_counts }}',
label_name = '{{ label_name }}',
memory_size_gb = {{ memory_size_gb }}
WHERE 
pci_device_id = '{{ pci_device_id }}' --required
RETURNING
pci_device_id,
pci_subsystem_device_id,
pci_vendor_id,
display_name,
label_name,
created_at,
cuda_major_version,
cuda_minor_version,
form_factor,
gpu_counts,
memory_size_gb,
request_status,
updated_at;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete_by_vendor_subsystem"
    values={[
        { label: 'delete_by_vendor_subsystem', value: 'delete_by_vendor_subsystem' },
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete_by_vendor_subsystem">

Delete a GPU record matching the full PCI composite key

```sql
DELETE FROM nvidia.catalog.gpus
WHERE pci_device_id = '{{ pci_device_id }}' --required
AND pci_vendor_id = '{{ pci_vendor_id }}' --required
AND pci_subsystem_device_id = '{{ pci_subsystem_device_id }}' --required
;
```
</TabItem>
<TabItem value="delete">

Delete a GPU record using only PCI Device ID (pciVendorId and pciSubsystemDeviceId default to 'unknown')

```sql
DELETE FROM nvidia.catalog.gpus
WHERE pci_device_id = '{{ pci_device_id }}' --required
;
```
</TabItem>
</Tabs>
