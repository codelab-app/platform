import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'
import { CreateLambdaMutationVariables } from './CreateLambda.web.graphql.gen'

export type CreateLambdaInput = CreateLambdaMutationVariables['input']

export const createLambdaSchema: JSONSchemaType<CreateLambdaInput> = {
  title: 'Create Lambda Input',
  type: 'object',
  properties: {
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
  required: ['name', 'body'],
}
