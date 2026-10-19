--- 
title: orgs
hide_title: false
hide_table_of_contents: false
keywords:
  - orgs
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

Creates, updates, deletes, gets or lists an <code>orgs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="orgs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.orgs.orgs" /></td></tr>
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
    <td><code>integer (int64)</code></td>
    <td>Unique Id of this team.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Organization name.</td>
</tr>
<tr>
    <td><CopyableCode code="billing_account_id" /></td>
    <td><code>string</code></td>
    <td>Billing account ID. (wire: billingAccountId)</td>
</tr>
<tr>
    <td><CopyableCode code="idp_id" /></td>
    <td><code>string</code></td>
    <td>Identity Provider ID. (wire: idpId)</td>
</tr>
<tr>
    <td><CopyableCode code="pec_sfdc_id" /></td>
    <td><code>string</code></td>
    <td>Product end customer salesforce.com Id (external customer Id). pecSfdcId is for EMS (entitlement management service) to track external paid customer. (wire: pecSfdcId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Name of the organization that will be shown to users. (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="alternate_contact" /></td>
    <td><code>object</code></td>
    <td>Org Owner Alternate Contact (wire: alternateContact)</td>
</tr>
<tr>
    <td><CopyableCode code="can_add_on" /></td>
    <td><code>boolean</code></td>
    <td>Identifies if the org can be reused. (wire: canAddOn)</td>
</tr>
<tr>
    <td><CopyableCode code="country" /></td>
    <td><code>string</code></td>
    <td>ISO country code of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Optional description of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="industry" /></td>
    <td><code>string</code></td>
    <td>Industry of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="infinity_manager_settings" /></td>
    <td><code>object</code></td>
    <td>Infinity manager setting definition (wire: infinityManagerSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="is_dataset_service_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Dataset Service enable flag for an organization (wire: isDatasetServiceEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_internal" /></td>
    <td><code>boolean</code></td>
    <td>Is NVIDIA internal org or not (wire: isInternal)</td>
</tr>
<tr>
    <td><CopyableCode code="is_proto" /></td>
    <td><code>boolean</code></td>
    <td>Indicates when the org is a proto org (wire: isProto)</td>
</tr>
<tr>
    <td><CopyableCode code="is_quick_start_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Quick Start enable flag for an organization (wire: isQuickStartEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_registry_sse_enabled" /></td>
    <td><code>boolean</code></td>
    <td>If a server side encryption is enabled for private registry (models, resources) (wire: isRegistrySSEEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_secrets_manager_service_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Secrets Manager Service enable flag for an organization (wire: isSecretsManagerServiceEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_secure_credential_sharing_service_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Secure Credential Sharing Service enable flag for an organization (wire: isSecureCredentialSharingServiceEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_separate_influx_db_used" /></td>
    <td><code>boolean</code></td>
    <td>If a separate influx db used for an organization in BCP for job telemetry (wire: isSeparateInfluxDbUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="nca_account_number" /></td>
    <td><code>string</code></td>
    <td>NVIDIA Cloud Account Number. (wire: ncaAccountNumber)</td>
</tr>
<tr>
    <td><CopyableCode code="org_owner" /></td>
    <td><code>object</code></td>
    <td>Org owner. (wire: orgOwner)</td>
</tr>
<tr>
    <td><CopyableCode code="org_owners" /></td>
    <td><code>array</code></td>
    <td>Org owners (wire: orgOwners)</td>
</tr>
<tr>
    <td><CopyableCode code="product_enablements" /></td>
    <td><code>array</code></td>
    <td> (wire: productEnablements)</td>
</tr>
<tr>
    <td><CopyableCode code="product_subscriptions" /></td>
    <td><code>array</code></td>
    <td> (wire: productSubscriptions)</td>
</tr>
<tr>
    <td><CopyableCode code="repo_scan_settings" /></td>
    <td><code>object</code></td>
    <td>Repo scan setting definition (wire: repoScanSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (UNKNOWN, CLOUD, ENTERPRISE, INDIVIDUAL)</td>
</tr>
<tr>
    <td><CopyableCode code="users_info" /></td>
    <td><code>object</code></td>
    <td>Users information. (wire: usersInfo)</td>
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
    <td>Unique Id of this team.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Organization name.</td>
</tr>
<tr>
    <td><CopyableCode code="billing_account_id" /></td>
    <td><code>string</code></td>
    <td>Billing account ID. (wire: billingAccountId)</td>
</tr>
<tr>
    <td><CopyableCode code="idp_id" /></td>
    <td><code>string</code></td>
    <td>Identity Provider ID. (wire: idpId)</td>
</tr>
<tr>
    <td><CopyableCode code="pec_sfdc_id" /></td>
    <td><code>string</code></td>
    <td>Product end customer salesforce.com Id (external customer Id). pecSfdcId is for EMS (entitlement management service) to track external paid customer. (wire: pecSfdcId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>Name of the organization that will be shown to users. (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="alternate_contact" /></td>
    <td><code>object</code></td>
    <td>Org Owner Alternate Contact (wire: alternateContact)</td>
</tr>
<tr>
    <td><CopyableCode code="can_add_on" /></td>
    <td><code>boolean</code></td>
    <td>Identifies if the org can be reused. (wire: canAddOn)</td>
</tr>
<tr>
    <td><CopyableCode code="country" /></td>
    <td><code>string</code></td>
    <td>ISO country code of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Optional description of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="industry" /></td>
    <td><code>string</code></td>
    <td>Industry of the organization.</td>
</tr>
<tr>
    <td><CopyableCode code="infinity_manager_settings" /></td>
    <td><code>object</code></td>
    <td>Infinity manager setting definition (wire: infinityManagerSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="is_dataset_service_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Dataset Service enable flag for an organization (wire: isDatasetServiceEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_internal" /></td>
    <td><code>boolean</code></td>
    <td>Is NVIDIA internal org or not (wire: isInternal)</td>
</tr>
<tr>
    <td><CopyableCode code="is_proto" /></td>
    <td><code>boolean</code></td>
    <td>Indicates when the org is a proto org (wire: isProto)</td>
</tr>
<tr>
    <td><CopyableCode code="is_quick_start_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Quick Start enable flag for an organization (wire: isQuickStartEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_registry_sse_enabled" /></td>
    <td><code>boolean</code></td>
    <td>If a server side encryption is enabled for private registry (models, resources) (wire: isRegistrySSEEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_secrets_manager_service_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Secrets Manager Service enable flag for an organization (wire: isSecretsManagerServiceEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_secure_credential_sharing_service_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Secure Credential Sharing Service enable flag for an organization (wire: isSecureCredentialSharingServiceEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="is_separate_influx_db_used" /></td>
    <td><code>boolean</code></td>
    <td>If a separate influx db used for an organization in BCP for job telemetry (wire: isSeparateInfluxDbUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="nca_account_number" /></td>
    <td><code>string</code></td>
    <td>NVIDIA Cloud Account Number. (wire: ncaAccountNumber)</td>
</tr>
<tr>
    <td><CopyableCode code="org_owner" /></td>
    <td><code>object</code></td>
    <td>Org owner. (wire: orgOwner)</td>
</tr>
<tr>
    <td><CopyableCode code="org_owners" /></td>
    <td><code>array</code></td>
    <td>Org owners (wire: orgOwners)</td>
</tr>
<tr>
    <td><CopyableCode code="product_enablements" /></td>
    <td><code>array</code></td>
    <td> (wire: productEnablements)</td>
</tr>
<tr>
    <td><CopyableCode code="product_subscriptions" /></td>
    <td><code>array</code></td>
    <td> (wire: productSubscriptions)</td>
</tr>
<tr>
    <td><CopyableCode code="repo_scan_settings" /></td>
    <td><code>object</code></td>
    <td>Repo scan setting definition (wire: repoScanSettings)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (UNKNOWN, CLOUD, ENTERPRISE, INDIVIDUAL)</td>
</tr>
<tr>
    <td><CopyableCode code="users_info" /></td>
    <td><code>object</code></td>
    <td>Users information. (wire: usersInfo)</td>
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
    <td><a href="#parameter-org_name"><code>org_name</code></a></td>
    <td></td>
    <td>Get organization information</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-page_number"><code>page_number</code></a>, <a href="#parameter-page_size"><code>page_size</code></a></td>
    <td>List all organizations of the user</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td></td>
    <td></td>
    <td>Create a new organization based on the org info provided in the request.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-org_name"><code>org_name</code></a></td>
    <td></td>
    <td>Update organization information</td>
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
<tr id="parameter-org_name">
    <td><CopyableCode code="org_name" /></td>
    <td><code>string</code></td>
    <td></td>
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

Get organization information

```sql
SELECT
id,
name,
billing_account_id,
idp_id,
pec_sfdc_id,
display_name,
alternate_contact,
can_add_on,
country,
description,
industry,
infinity_manager_settings,
is_dataset_service_enabled,
is_internal,
is_proto,
is_quick_start_enabled,
is_registry_sse_enabled,
is_secrets_manager_service_enabled,
is_secure_credential_sharing_service_enabled,
is_separate_influx_db_used,
nca_account_number,
org_owner,
org_owners,
product_enablements,
product_subscriptions,
repo_scan_settings,
type,
users_info
FROM nvidia.orgs.orgs
WHERE org_name = '{{ org_name }}' -- required
;
```
</TabItem>
<TabItem value="list">

List all organizations of the user

```sql
SELECT
id,
name,
billing_account_id,
idp_id,
pec_sfdc_id,
display_name,
alternate_contact,
can_add_on,
country,
description,
industry,
infinity_manager_settings,
is_dataset_service_enabled,
is_internal,
is_proto,
is_quick_start_enabled,
is_registry_sse_enabled,
is_secrets_manager_service_enabled,
is_secure_credential_sharing_service_enabled,
is_separate_influx_db_used,
nca_account_number,
org_owner,
org_owners,
product_enablements,
product_subscriptions,
repo_scan_settings,
type,
users_info
FROM nvidia.orgs.orgs
WHERE page_number = '{{ page_number }}'
AND page_size = '{{ page_size }}'
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

Create a new organization based on the org info provided in the request.

```sql
INSERT INTO nvidia.orgs.orgs (
country,
description,
display_name,
initiator,
is_internal,
name,
nca_id,
nca_number,
org_owner,
pec_name,
pec_sfdc_id,
product_enablements,
product_subscriptions,
proto_org_id,
salesforce_account_industry,
send_email,
type
)
SELECT 
'{{ country }}',
'{{ description }}',
'{{ display_name }}',
'{{ initiator }}',
{{ is_internal }},
'{{ name }}',
'{{ nca_id }}',
'{{ nca_number }}',
'{{ org_owner }}',
'{{ pec_name }}',
'{{ pec_sfdc_id }}',
'{{ product_enablements }}',
'{{ product_subscriptions }}',
'{{ proto_org_id }}',
'{{ salesforce_account_industry }}',
{{ send_email }},
'{{ type }}'
RETURNING
organizations,
request_status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: orgs
  props:
    - name: country
      value: "{{ country }}"
      description: |
        user country
    - name: description
      value: "{{ description }}"
      description: |
        optional description of the organization
    - name: display_name
      value: "{{ display_name }}"
      description: |
        Name of the organization that will be shown to users.
    - name: initiator
      value: "{{ initiator }}"
      description: |
        Identify the initiator of the org request
    - name: is_internal
      value: {{ is_internal }}
      description: |
        Is NVIDIA internal org or not
    - name: name
      value: "{{ name }}"
      description: |
        Organization name
    - name: nca_id
      value: "{{ nca_id }}"
      description: |
        NVIDIA Cloud Account Identifier
    - name: nca_number
      value: "{{ nca_number }}"
      description: |
        NVIDIA Cloud Account Number
    - name: org_owner
      description: |
        Org owner.
      value:
        email: "{{ email }}"
        fullName: "{{ fullName }}"
        idpId: "{{ idpId }}"
        starfleetId: "{{ starfleetId }}"
    - name: pec_name
      value: "{{ pec_name }}"
      description: |
        product end customer name for enterprise(Fleet Command) product
    - name: pec_sfdc_id
      value: "{{ pec_sfdc_id }}"
      description: |
        product end customer salesforce.com Id (external customer Id) for enterprise(Fleet Command) product
    - name: product_enablements
      value:
        - expirationDate: "{{ expirationDate }}"
          poDetails: "{{ poDetails }}"
          productName: "{{ productName }}"
          type: "{{ type }}"
    - name: product_subscriptions
      description: |
        This should be deprecated, use productEnablements instead
      value:
        - emsEntitlementType: "{{ emsEntitlementType }}"
          expirationDate: "{{ expirationDate }}"
          id: "{{ id }}"
          productName: "{{ productName }}"
          startDate: "{{ startDate }}"
          type: "{{ type }}"
    - name: proto_org_id
      value: "{{ proto_org_id }}"
      description: |
        Proto org identifier
    - name: salesforce_account_industry
      value: "{{ salesforce_account_industry }}"
      description: |
        Company or organization industry
    - name: send_email
      value: {{ send_email }}
      description: |
        Send email to org owner or not. Default is true
    - name: type
      value: "{{ type }}"
      valid_values: ['UNKNOWN', 'CLOUD', 'ENTERPRISE', 'INDIVIDUAL']
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

Update organization information

```sql
UPDATE nvidia.orgs.orgs
SET 
description = '{{ description }}',
display_name = '{{ display_name }}'
WHERE 
org_name = '{{ org_name }}' --required
RETURNING
organizations,
request_status;
```
</TabItem>
</Tabs>
