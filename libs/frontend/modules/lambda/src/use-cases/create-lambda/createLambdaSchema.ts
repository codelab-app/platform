import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { CreateLambdaInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const createLambdaSchema: JSONSchemaType<CreateLambdaInput> = {
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
