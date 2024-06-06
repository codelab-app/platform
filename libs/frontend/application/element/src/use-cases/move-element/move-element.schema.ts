import type { MoveData } from '@codelab/frontend/abstract/application'
import type { JSONSchemaType } from 'ajv'
import { idSchema } from '@codelab/frontend-presentation-view/components/form'

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
          label: 'Prev Sibling',
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