import type { IUpdateTagDTO } from '@codelab/frontend/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateTagSchema: JSONSchemaType<IUpdateTagDTO> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
