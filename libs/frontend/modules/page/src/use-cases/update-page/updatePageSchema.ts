import { JSONSchemaType } from 'ajv'
import { UpdatePageMutationInput } from './types'

export const updatePageSchema: JSONSchemaType<UpdatePageMutationInput> = {
  title: 'Update Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
}
