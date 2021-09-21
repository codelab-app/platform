import { JSONSchemaType } from 'ajv'
import { DeleteLambdaMutationVariables } from './DeleteLambda.web.graphql.gen'

export type DeleteLambdaSchema = DeleteLambdaMutationVariables['input']

export const deleteLambdaSchema: JSONSchemaType<DeleteLambdaSchema> = {
  title: 'Delete Lambda',
  type: 'object',
  properties: {
    lambdaId: { type: 'string', disabled: true },
  },
  required: ['lambdaId'],
}
