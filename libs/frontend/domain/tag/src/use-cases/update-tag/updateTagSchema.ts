import type { IUpdateTagData } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import type { JSONSchemaType } from 'ajv'

export const updateTagSchema: JSONSchemaType<IUpdateTagData> = {
  title: 'Update Tag Input',
  type: 'object',
  properties: {
    ...idSchema,
    parent: {
      type: 'object',
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
      },
      required: ['id'],
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name'],
} as const
