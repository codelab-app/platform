import type { IUpdateTagData } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const updateTagSchema: JSONSchemaType<IUpdateTagData> = {
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      type: 'string',
    },
    parent: {
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
  },
  required: ['name'],
  title: 'Update Tag Input',
  type: 'object',
} as const
