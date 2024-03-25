import {
  idSchema,
  nonEmptyString,
  refSchema,
} from '@codelab/frontend/presentation/view'
import type { ICreateTagData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import { TagSelect } from '../../shared'

export const createTagSchema: JSONSchemaType<ICreateTagData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    parent: {
      nullable: true,
      properties: {
        ...idSchema({
          // component: TagSelect,
        }),
      },
      default: null,
      required: [],
      type: 'object',
    },
  },
  required: ['id', 'name'],
  title: 'Create Tag Input',
  type: 'object',
} as const
