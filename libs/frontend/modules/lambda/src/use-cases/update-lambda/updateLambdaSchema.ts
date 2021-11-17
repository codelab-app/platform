import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'
import { UpdateLambdaMutationInput } from './types'

export const updateLambdaSchema: JSONSchemaType<UpdateLambdaMutationInput> = {
  title: 'Update Lambda Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      disabled: true,
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
