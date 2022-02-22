import { JSONSchemaType } from 'ajv'
import { MoveData } from './types'

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
