import { MonacoField } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'
import { CreateLambdaMutationVariables } from './CreateLambda.api.graphql'

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
      uniforms: { component: MonacoField },
    },
  },
  required: ['name', 'body'],
}
