import { CreatePageInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<CreatePageInput> = {
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
