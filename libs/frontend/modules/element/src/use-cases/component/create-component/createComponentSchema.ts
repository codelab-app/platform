import { JSONSchemaType } from 'ajv'
import { CreateComponentInput } from './types'

export const createComponentSchema: JSONSchemaType<CreateComponentInput> = {
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
