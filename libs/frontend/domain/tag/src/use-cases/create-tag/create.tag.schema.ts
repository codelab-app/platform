import type { ICreateTagData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  nonEmptyString,
  ownerSchema,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<ICreateTagData> = {
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    parent: {
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    },
    ...ownerSchema,
  },
  required: ['id', 'name'],
  title: 'Create Tag Input',
  type: 'object',
} as const
