import { JSONSchemaType } from 'ajv'
import { UpdateComponentInput } from './types'

export const updateComponentSchema: JSONSchemaType<UpdateComponentInput> = {
  title: 'Create Component Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
    },
  },
  required: ['name'],
}
