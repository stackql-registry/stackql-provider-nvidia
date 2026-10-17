--- 
title: proto_orgs
hide_title: false
hide_table_of_contents: false
keywords:
  - proto_orgs
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

Creates, updates, deletes, gets or lists a <code>proto_orgs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="proto_orgs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="nvidia.orgs.proto_orgs" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="validate"
    values={[
        { label: 'validate', value: 'validate' }
    ]}
>
<TabItem value="validate">

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
    <td><CopyableCode code="proto_org_id" /></td>
    <td><code>string</code></td>
    <td>Proto Org identifier. (wire: protoOrgId)</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td>Email address of the user.</td>
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
    <td><a href="#validate"><CopyableCode code="validate" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-invitation_token"><code>invitation_token</code></a></td>
    <td></td>
    <td>Validate org creation from proto org</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td></td>
    <td></td>
    <td>Create a new organization based on the org info retrieved from the ProtoOrg.</td>
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
<tr id="parameter-invitation_token">
    <td><CopyableCode code="invitation_token" /></td>
    <td><code>string</code></td>
    <td>JWT that contains org owner email and proto org identifier</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="validate"
    values={[
        { label: 'validate', value: 'validate' }
    ]}
>
<TabItem value="validate">

Validate org creation from proto org

```sql
SELECT
proto_org_id,
email
FROM nvidia.orgs.proto_orgs
WHERE invitation_token = '{{ invitation_token }}' -- required
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

Create a new organization based on the org info retrieved from the ProtoOrg.

```sql
INSERT INTO nvidia.orgs.proto_orgs (
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
- name: proto_orgs
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
