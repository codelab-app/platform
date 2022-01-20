import { DeletePageInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const deletePageSchema: JSONSchemaType<DeletePageInput> = {
  title: 'Delete Page',
  type: 'object',
  properties: {
    pageId: {
      type: 'string',
    },
  },
  required: [],
} as const
