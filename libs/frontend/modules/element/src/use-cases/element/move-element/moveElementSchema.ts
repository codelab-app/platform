import { MoveData } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const moveElementSchema: JSONSchemaType<MoveData> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    order: {
      type: 'integer',
    },
    parentElementId: {
      type: 'string',
      label: 'Parent Element',
      nullable: true,
    },
  },
  required: [],
} as const
