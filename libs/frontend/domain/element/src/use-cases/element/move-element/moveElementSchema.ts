import type { MoveData } from '@codelab/frontend/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const moveElementSchema: JSONSchemaType<MoveData> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    parentElement: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          label: 'Parent Element',
          nullable: true,
        },
      },
      required: ['id'],
    },
    prevSibling: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          nullable: true,
          label: 'Linked by',
        },
      },
      required: ['id'],
    },
  },
  required: ['parentElement', 'prevSibling'],
} as const
