import { MonacoField } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'
import { UpdateLambdaMutationVariables } from './UpdateLambda.api.graphql'

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
      uniforms: { component: MonacoField },
    },
  },
  required: ['id', 'name', 'body'],
}
