import { JSONSchemaType } from 'ajv'

export type DeleteAppInput = Record<string, unknown>

export const DeleteAppSchema: JSONSchemaType<DeleteAppInput> = {
  title: 'Delete App',
  type: 'object',
  properties: {},
  required: [],
}
