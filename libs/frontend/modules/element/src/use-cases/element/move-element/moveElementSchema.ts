import { JSONSchemaType } from 'ajv'
import { MoveElementMutationVariables } from '../../../graphql'

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
