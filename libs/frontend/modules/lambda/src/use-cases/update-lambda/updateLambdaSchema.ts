import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'
import { UpdateLambdaMutationVariables } from './UpdateLambda.api.graphql.gen'

export type UpdateLambdaSchema = UpdateLambdaMutationVariables['input']

export const updateLambdaSchema: JSONSchemaType<UpdateLambdaSchema> = {
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
