import {
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-view/components/form'
import type { ICreateTagData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

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
