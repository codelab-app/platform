import { JSONSchema7 } from 'json-schema'
import React from 'react'
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

export const accordionFormProps = {
  schema: accordionSchema,
  uiSchema,
  ObjectFieldTemplate: ObjectFieldAccordionTemplate,
}

export const AccordionForm = () => {
  return <JsonSchemaForm {...accordionFormProps} />
}
