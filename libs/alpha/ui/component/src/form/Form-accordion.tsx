import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { CodelabObjectFieldTemplate } from './rjsf-templates/CodelabObjectFieldTemplate'
import { ObjectFieldAccordionTemplate } from './rjsf-templates/ObjectFieldAccordionTemplate'
import { JsonSchemaForm } from '@codelab/frontend'

const uiSchema = {
  'ui:accordion': [
    'firstname',
    'lastname',
    {
      groups: {
        password: ['password'],
        contacts: ['email'],
        address: ['address'],
      },
      'ui:template': 'accordion',
    },
  ],
}

const accordionSchema: JSONSchema7 = {
  type: 'object',
  properties: {
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
    address: {
      type: 'object',
      properties: {
        streetName: { type: 'string', title: 'Street Name' },
        houseNumber: { type: 'number', title: 'House Number' },
      },
    },
    notGroupedField: {
      type: 'string',
    },
  },
}

// TODO change accordion form to work with Uniforms

export const accordionFormProps = {
  schema: accordionSchema,
  // uiSchema,
  // ObjectFieldTemplate: ObjectFieldAccordionTemplate,
}

export const AccordionForm = () => {
  return <JsonSchemaForm onSubmit={console.log} {...accordionFormProps} />
}

export const accordionFormPropsV2 = {
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
    },
  } as JSONSchema7,
  uiSchema: {
    'ui:accordion': [
      { title: 'Info', fields: ['email', 'password'] },
      { title: 'Address', fields: ['address_1', 'address_2'] },
    ],
  },
  ObjectFieldTemplate: CodelabObjectFieldTemplate,
}

export const AccordionFormV2 = () => {
  return <JsonSchemaForm onSubmit={console.log} {...accordionFormPropsV2} />
}
