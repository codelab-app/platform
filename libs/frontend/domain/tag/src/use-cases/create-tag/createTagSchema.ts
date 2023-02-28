import type { ICreateTagDTO } from '@codelab/frontend/abstract/core'
import { idSchema, ownerSchema } from '@codelab/frontend/shared/domain'
import { nonEmptyString, showFieldOnDev } from '@codelab/frontend/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const createTagSchema: JSONSchemaType<ICreateTagDTO> = {
  title: 'Create Tag Input',
  type: 'object',
  properties: {
    ...idSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    parent: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          nullable: true,
        },
      },
      required: ['id'],
      nullable: true,
    },
    ...ownerSchema,
  },
  required: ['name'],
} as const
