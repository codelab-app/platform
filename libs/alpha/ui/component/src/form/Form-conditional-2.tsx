import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { JsonSchemaForm } from '@codelab/frontend'

const schema: JSONSchema7 = {
  title: 'Schema dependencies',
  description: 'These samples are best viewed without live validation.',
  type: 'object',
  properties: {
    conditional: {
      title: 'Conditional',
      $ref: '#/definitions/__type',
    },
  },
  definitions: {
    __type: {
      title: 'Type',
      type: 'object',
      properties: {
        __type: {
          type: 'string',
          enum: ['A', 'B'],
          // default: 'A',
        },
      },
      // required: ['__type'],
      dependencies: {
        __type: {
          oneOf: [
            {
              properties: {
                __type: {
                  enum: ['A'],
                },
                props: {
                  type: 'string',
                },
              },
              required: ['props'],
            },
            {
              properties: {
                __type: {
                  enum: ['B'],
                },
                props: {
                  type: 'boolean',
                },
              },
              required: ['props'],
            },
          ],
        },
      },
    },
  },
}

export const FormConditional2 = () => {
  return (
    <JsonSchemaForm
      initialFormData={{
        conditional: {
          __type: 'A',
        },
      }}
      schema={schema}
    />
  )
}
