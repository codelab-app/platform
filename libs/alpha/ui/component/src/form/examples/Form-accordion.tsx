import { JSONSchema7 } from 'json-schema'
import React from 'react'
import {
  AccordionDetails,
  ObjectFieldAccordionTemplate,
} from '../rjsf-templates/ObjectFieldAccordionTemplate'
import { JsonSchemaForm } from '@codelab/frontend'

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? UiGroup<T[P]> & RecursivePartial<T[P]>
    : never
}

type UiGroup<T> = {
  'ui:accordion': AccordionDetails<T>
}

export type GroupsUiSchema<T = any> = UiGroup<T> & RecursivePartial<T>

export const FormAccordion = () => {
  const DemoAccordionPropsUISchema = {
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

  const DemoAccordionPropsSchema: JSONSchema7 = {
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

  const DemoAccordionPropsFormProps = {
    ObjectFieldTemplate: ObjectFieldAccordionTemplate,
    uiSchema: DemoAccordionPropsUISchema,
  }

  return (
    <JsonSchemaForm
      initialFormData={{}}
      onSubmit={() => null}
      schema={DemoAccordionPropsSchema}
      {...DemoAccordionPropsFormProps}
    />
  )
}
