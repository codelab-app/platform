import { MoveData } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type MovePageElementSchemaType = MoveData

export const movePageElementSchema: JSONSchemaType<MovePageElementSchemaType> =
  {
    title: 'Update Page Element Input',
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
