import { JSONSchemaType } from 'ajv'
import { DeleteComponentInput } from './types'

export const deleteComponentSchema: JSONSchemaType<DeleteComponentInput> = {
  title: 'Delete Component',
  type: 'object',
  properties: {
    componentId: {
      type: 'string',
    },
  },
  required: [],
} as const
