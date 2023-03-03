import type { JSONSchemaType } from 'ajv'

export interface DeleteLambdaData {
  lambdaId: string
}

export const deleteLambdaSchema: JSONSchemaType<DeleteLambdaData> = {
  properties: {
    lambdaId: { disabled: true, type: 'string' },
  },
  required: ['lambdaId'],
  title: 'Delete Lambda',
  type: 'object',
}
