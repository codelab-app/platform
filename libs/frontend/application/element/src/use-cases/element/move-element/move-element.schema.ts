import type { MoveData } from '@codelab/frontend/abstract/domain'
import { idSchema } from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

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
      required: ['id'],
      type: 'object',
    },
    prevSibling: {
      properties: {
        ...idSchema(),
        id: {
          label: 'Linked by',
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    },
  },
  required: ['parentElement', 'prevSibling'],
  title: 'Update Element Input',
  type: 'object',
} as const
