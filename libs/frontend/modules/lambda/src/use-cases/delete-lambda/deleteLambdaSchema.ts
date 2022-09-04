import { JSONSchemaType } from 'ajv'

export interface DeleteLambdaData {
  lambdaId: string
}

export const deleteLambdaSchema: JSONSchemaType<DeleteLambdaData> = {
  title: 'Delete Lambda',
  type: 'object',
  properties: {
    lambdaId: { type: 'string', disabled: true },
  },
  required: ['lambdaId'],
}
