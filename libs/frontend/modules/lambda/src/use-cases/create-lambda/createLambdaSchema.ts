import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'
import { CreateLambdaMutationInput } from './types'

export const createLambdaSchema: JSONSchemaType<CreateLambdaMutationInput> = {
  title: 'Create Lambda Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
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
  required: ['name', 'body'],
}
