import {
  CreatePageInput,
  UpdatePageInput,
} from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const updatePageSchema: JSONSchemaType<CreatePageInput> = {
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
