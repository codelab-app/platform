import { JSONSchemaType } from 'ajv'
import { DeleteAppInput } from './types'

export const deleteAppSchema: JSONSchemaType<DeleteAppInput> = {
  title: 'Delete App',
  type: 'object',
  properties: {
    appId: {
      type: 'string',
    },
  },
  required: [],
}
