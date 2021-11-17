import { JSONSchemaType } from 'ajv'
import { DeleteLambdaMutationInput } from './types'

export const deleteLambdaSchema: JSONSchemaType<DeleteLambdaMutationInput> = {
  title: 'Delete Lambda',
  type: 'object',
  properties: {
    lambdaId: { type: 'string', disabled: true },
  },
  required: ['lambdaId'],
}
