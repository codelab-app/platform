import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { UpdateLambdaInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const updateLambdaSchema: JSONSchemaType<UpdateLambdaInput> = {
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
