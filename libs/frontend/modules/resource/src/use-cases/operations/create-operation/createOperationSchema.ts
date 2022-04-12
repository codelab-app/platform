import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'

export type CreateOperationInput = {
  name: string
  body: string
}

export const createOperationSchema: JSONSchemaType<CreateOperationInput> = {
  title: 'Create Operation',
  type: 'object',
  properties: {
    ...{
      name: {
        type: 'string',
        autoFocus: true,
      },
      body: {
        type: 'string',
        component: monacoFieldFactory({
          editorOptions: {
            language: 'typescript',
          },
          containerProps: {
            style: {
              height: '240px',
            },
          },
        }),
      },
    },
  },
  required: ['name', 'body'],
} as const
