import { JSONSchemaType } from 'ajv'
import { MoveElementMutationVariables } from './MoveElement.web.graphql.gen'

export type MoveElementSchema =
  MoveElementMutationVariables['input']['moveData']

export const moveElementSchema: JSONSchemaType<MoveElementSchema> = {
  title: 'Update Element Input',
  type: 'object',
  properties: {
    order: {
      type: 'integer',
    },
    parentElementId: {
      type: 'string',
      label: 'Parent Element',
    },
  },
  required: [],
} as const
