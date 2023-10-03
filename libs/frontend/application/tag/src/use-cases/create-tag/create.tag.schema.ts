import type { ICreateTagData } from '@codelab/frontend/abstract/domain'
import { idSchema, nonEmptyString } from '@codelab/frontend/presentation/view'
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
          component: TagSelect,
        }),
      },
      required: [],
      type: 'object',
    },
  },
  required: ['id', 'name'],
  title: 'Create Tag Input',
  type: 'object',
} as const
