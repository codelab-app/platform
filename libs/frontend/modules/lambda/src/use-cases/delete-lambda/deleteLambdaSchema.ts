import { DeleteLambdaInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const deleteLambdaSchema: JSONSchemaType<DeleteLambdaInput> = {
  title: 'Delete Lambda',
  type: 'object',
  properties: {
    lambdaId: { type: 'string', disabled: true },
  },
  required: ['lambdaId'],
}
