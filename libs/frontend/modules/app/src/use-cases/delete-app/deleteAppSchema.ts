import { JSONSchemaType } from 'ajv'
import { DeleteAppMutationInput } from './types'

export const deleteAppSchema: JSONSchemaType<DeleteAppMutationInput> = {
  title: 'Delete App',
  type: 'object',
  properties: {
    appId: {
      type: 'string',
    },
  },
  required: [],
}
