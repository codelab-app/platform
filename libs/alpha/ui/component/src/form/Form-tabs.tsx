import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { CodelabObjectFieldTemplate } from './rjsf-templates/CodelabObjectFieldTemplate'
import { ObjectFieldTabsTemplate } from './rjsf-templates/ObjectFieldTabsTemplate'
import { JsonSchemaForm } from '@codelab/frontend'

export const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    address: {
      type: 'object',
      title: 'Address - Object Test',
      properties: {
        streetName: { type: 'string', title: 'Street Name' },
        houseNumber: { type: 'string', title: 'House Number' },
        postalCode: { type: 'string', title: 'Postal Code' },
        phoneNumber: { type: 'string', title: 'Phone Number' },
      },
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    firstname: {
      type: 'string',
    },
    lastname: {
      type: 'string',
    },
    notGroupedField: {
      type: 'string',
    },
  },
}

export const tabsFormProps = {
  schema,
  ObjectFieldTemplate: ObjectFieldTabsTemplate,
  uiSchema: {
    'ui:groups': [
      'firstname',
      'lastname',
      {
        groups: {
          password: ['password', 'address'],
          contacts: ['email'],
        },
        'ui:template': 'tabs',
      },
    ],
  },
}

export const TabsForm = () => {
  return <JsonSchemaForm {...tabsFormProps} />
}

export const tabsFormPropsV2 = {
  ...tabsFormProps,
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      address_1: {
        type: 'string',
      },
      address_2: {
        type: 'string',
      },
      other: {
        type: 'string',
      },
      address: {
        type: 'object',
        title: 'Address - Object Test',
        properties: {
          streetName: { type: 'string', title: 'Street Name' },
          houseNumber: { type: 'string', title: 'House Number' },
          postalCode: { type: 'string', title: 'Postal Code' },
          phoneNumber: { type: 'string', title: 'Phone Number' },
        },
      },
    },
  } as JSONSchema7,
  uiSchema: {
    'ui:tabs': [
      { title: 'Info', fields: ['email', 'password'] },
      { title: 'Address', fields: ['address_1', 'address_2', 'address'] },
    ],
  },
  ObjectFieldTemplate: CodelabObjectFieldTemplate,
}

export const TabsFormV2 = () => {
  return <JsonSchemaForm {...tabsFormPropsV2} />
}
