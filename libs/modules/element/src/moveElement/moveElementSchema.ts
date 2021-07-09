import { MoveData } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type MoveElementSchemaType = MoveData

export const moveElementSchema: JSONSchemaType<MoveElementSchemaType> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    order: {
      type: 'integer',
      nullable: true,
    },
    parentElementId: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
} as const
