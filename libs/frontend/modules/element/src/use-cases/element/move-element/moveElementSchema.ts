import { MoveData } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const moveElementSchema: JSONSchemaType<MoveData> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    parentElementId: {
      type: 'string',
      label: 'Parent Element',
      nullable: true,
    },
    prevSiblingId: {
      type: 'string',
      nullable: true,
      label: 'Linked by',
    },
  },
  required: [],
} as const
