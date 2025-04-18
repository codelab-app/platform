import type { IUpdateTagData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'

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
    ...refSchema('owner'),
  },
  required: ['name', 'owner'],
  title: 'Update Tag Input',
  type: 'object',
} as const
