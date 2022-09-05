import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'

export interface UpdateLambdaData {
  id: string
  name: string
  body: string
}

export const updateLambdaSchema: JSONSchemaType<UpdateLambdaData> = {
  title: 'Update Lambda Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      disabled: true,
      autoFocus: true,
    },
    name: {
      type: 'string',
    },
    body: {
      type: 'string',
      uniforms: {
        component: monacoFieldFactory({
          editorOptions: {
            language: 'javascript',
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
  required: ['id', 'name', 'body'],
}
