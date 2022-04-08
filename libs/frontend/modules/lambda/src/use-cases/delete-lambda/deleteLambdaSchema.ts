import { JSONSchemaType } from 'ajv'

export type DeleteLambdaData = {
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
