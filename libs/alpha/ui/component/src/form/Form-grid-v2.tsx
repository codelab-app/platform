import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { ObjectGridTemplate } from './rjsf-templates/ObjectGridTemplate'
import {
  CodelabFieldTemplate,
  CodelabSelectWidget,
} from '@codelab/alpha/ui/component'
import { JsonSchemaForm } from '@codelab/frontend'

const schema: JSONSchema7 = {
  title: 'Todo',
  type: 'object',
  // required: ['password'],
  properties: {
    password: {
      type: 'string',
      title: 'Password',
    },
    firstName: {
      type: 'string',
      title: 'First name',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    bio: {
      type: 'string',
      title: 'Bio',
    },

    age: {
      type: 'integer',
      title: 'Age',
    },
    searchSelect: {
      type: 'object',
      title: 'Search Select widget test',
      properties: {
        selectWidget: {
          type: 'string',
          enum: ['Option 1', 'Option 2', 'Option 3'],
        },
      },
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
    arrTest: {
      type: 'array',
      title: 'Array Test With Grid',
      items: {
        type: 'object',
        properties: {
          field1: { type: 'string' },
          field2: { type: 'string' },
        },
      },
    },
  },
}

const uiSchema = {
  'ui:ObjectFieldTemplate': ObjectGridTemplate,
  searchSelect: {
    'ui:ObjectFieldTemplate': ObjectGridTemplate,
    'ui:spacing': 16,
    span: 20,
    'ui:layout': [{ selectWidget: { span: 24 } }],
    selectWidget: {
      'ui:widget': CodelabSelectWidget,
    },
  },
  address: {
    'ui:ObjectFieldTemplate': ObjectGridTemplate,
    'ui:spacing': 16,
    span: 20,
    'ui:layout': [
      {
        streetName: { span: 10 },
        houseNumber: { span: 14 },
        postalCode: { span: 12 },
        phoneNumber: { span: 12 },
      },
    ],
  },
  arrTest: {
    span: 20,
    items: {
      'ui:ObjectFieldTemplate': ObjectGridTemplate,
      'ui:spacing': 16,
      'ui:layout': [
        {
          field1: { span: 6 },
          field2: { span: 6 },
        },
      ],
    },
  },
  'ui:spacing': 16,
  'ui:layout': [
    {
      'ui:order': ['lastName', 'firstName'],
      firstName: { span: 6 },
      lastName: { span: 6 },
    },
    {
      bio: { span: 12 },
    },
    {
      age: { span: 6 },
      password: { span: 6 },
    },
  ],
}

export const gridsFormV2Props = {
  schema,
  uiSchema,
}

export const GridsFormV2 = () => {
  return (
    <JsonSchemaForm
      {...gridsFormV2Props}
      FieldTemplate={CodelabFieldTemplate}
    />
  )
}
