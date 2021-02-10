import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { ObjectFieldTemplate } from '../../../src/demoGroupedForm/RJSFCustomGroupedTemplate'

const Form = withTheme(AntDTheme)

const VertexPage = () => {
  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      second: { type: 'string' },
      first: { type: 'string' },
      firstGName: { type: 'string' },
      firstGSurname: { type: 'string' },
      secondGroup: { type: 'string' },
      contacts: {
        type: 'object',
        description: 'complex object',
        properties: {
          phone: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
        },
      },
      deepNested: {
        type: 'object',
        properties: {
          firstGroup: {
            type: 'string',
          },
          secondGroup: {
            type: 'string',
          },
        },
      },
      outOfAnyGroup: { type: 'string' },
    },
  }

  const uiSchema = {
    'ui:groups': [
      'first',
      'second',
      {
        firstG: ['firstGName', 'firstGSurname', 'deepNested'],
        secondGroup: ['secondGroup'],
        'Contacts ': ['contacts'],
        'ui:template': 'tabs',
      },
    ],
    deepNested: {
      'ui:groups': [
        {
          first: ['firstGroup'],
          second: ['secondGroup'],
          'ui:template': 'tabs',
        },
      ],
    },
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      ObjectFieldTemplate={ObjectFieldTemplate}
    />
  )
}

export default VertexPage
