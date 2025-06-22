import type { MoveData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { idSchema } from '@codelab/frontend-presentation-components-form/schema'

export const moveElementSchema: JSONSchemaType<MoveData> = {
  properties: {
    parentElement: {
      properties: {
        ...idSchema(),
        id: {
          label: 'Parent Element',
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
    prevSibling: {
      properties: {
        ...idSchema(),
        id: {
          label: 'Prev Sibling',
          type: 'string',
        },
      },
      required: [],
      type: 'object',
    },
  },
  required: ['parentElement', 'prevSibling'],
  title: 'Update Element Input',
  type: 'object',
} as const
