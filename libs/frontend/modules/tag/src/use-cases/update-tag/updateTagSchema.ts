import { JSONSchemaType } from 'ajv'
import { UpdateTagMutationInput } from './types'

export const updateTagSchema: JSONSchemaType<UpdateTagMutationInput> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
}
