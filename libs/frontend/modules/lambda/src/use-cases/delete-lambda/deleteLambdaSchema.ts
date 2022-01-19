import { DeleteLambdaInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const deleteLambdaSchema: JSONSchemaType<DeleteLambdaInput> = {
  title: 'Delete Lambda',
  type: 'object',
  properties: {
    lambdaId: { type: 'string', disabled: true },
  },
  required: ['lambdaId'],
}
