import { JSONSchemaType } from 'ajv'
import { MoveElementMutationVariables } from './MoveElement.api.graphql'

export type MoveElementSchema =
  MoveElementMutationVariables['input']['moveData']

export const moveElementSchema: JSONSchemaType<MoveElementSchema> = {
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
      label: 'Parent Element',
    },
  },
  required: [],
} as const
