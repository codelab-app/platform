import { IUpdatePageDTO } from '@codelab/frontend/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updatePageSchema: JSONSchemaType<IUpdatePageDTO> = {
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
    slug: {
      type: 'string',
    },
  },
  required: ['name', 'slug'],
} as const
