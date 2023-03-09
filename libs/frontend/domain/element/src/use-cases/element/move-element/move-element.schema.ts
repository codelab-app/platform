import type { MoveData } from '@codelab/frontend/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const moveElementSchema: JSONSchemaType<MoveData> = {
  properties: {
    parentElement: {
      properties: {
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
