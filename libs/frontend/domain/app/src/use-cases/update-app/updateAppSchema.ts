import type { IUpdateAppDTO } from '@codelab/frontend/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
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
