import type { ICreateTagData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'

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
    ...refSchema('owner'),
  },
  required: ['id', 'name', 'owner'],
  title: 'Create Tag Input',
  type: 'object',
} as const
