import { DeleteAppInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

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
