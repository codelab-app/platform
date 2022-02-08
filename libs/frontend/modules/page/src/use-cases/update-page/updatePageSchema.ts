import { JSONSchemaType } from 'ajv'
import { UpdatePageInput } from './types'

export const updatePageSchema: JSONSchemaType<UpdatePageInput> = {
  title: 'Update Page Input',
  type: 'object',
  properties: {
    appId: {
      type: 'string',
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
