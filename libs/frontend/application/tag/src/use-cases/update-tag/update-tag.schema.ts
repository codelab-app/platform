import { idSchema } from '@codelab/frontend-presentation-view/components/form'
import type { IUpdateTagData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateTagSchema: JSONSchemaType<IUpdateTagData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      type: 'string',
    },
    parent: {
      nullable: true,
      properties: {
        ...idSchema(),
      },
      required: [],
      type: 'object',
    },
  },
  required: ['name'],
  title: 'Update Tag Input',
  type: 'object',
} as const
