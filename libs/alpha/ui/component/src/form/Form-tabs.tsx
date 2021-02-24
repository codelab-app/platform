import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { CodelabObjectFieldTemplate } from './rjsf-templates/CodelabObjectFieldTemplate'
import { ObjectFieldTabsTemplate } from './rjsf-templates/ObjectFieldTabsTemplate'
import { JsonSchemaForm } from '@codelab/frontend'

export const schema: JSONSchema7 = {
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
    notGroupedField: {
      type: 'string',
    },
  },
}

export const tabsFormProps = {
  schema,
  ObjectFieldTemplate: ObjectFieldTabsTemplate,
  uiSchema: {
    'ui:tabs': [
      'firstname',
      'lastname',
      {
        groups: {
          password: ['password'],
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

export const TabsFormV2 = () => {
  const tabsFormPropsV2 = {
    ...tabsFormProps,
    ObjectFieldTemplate: CodelabObjectFieldTemplate,
  }

  return <JsonSchemaForm {...tabsFormPropsV2} />
}
