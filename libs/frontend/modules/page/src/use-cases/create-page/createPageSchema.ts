import { JSONSchemaType } from 'ajv'
import { CreatePageMutationInput } from './types'

export const createPageSchema: JSONSchemaType<CreatePageMutationInput> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    appId: {
      type: 'string',
    },
  },
  required: ['name'],
} as const
