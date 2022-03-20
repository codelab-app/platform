import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'

export type CreateActionInput = {
  name: string
  body: string
}

export const createActionSchema: JSONSchemaType<CreateActionInput> = {
  title: 'Create Action',
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
