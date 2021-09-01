import { AtomType } from '@codelab/shared/enums'
import { JSONSchemaType } from 'ajv'
import { CreateAtomMutationVariables } from './create-atom.api.graphql'

export type CreateAtomSchema = CreateAtomMutationVariables['input']

export const createAtomSchema: JSONSchemaType<CreateAtomSchema> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: Object.keys(AtomType) as Array<AtomType>,
    },
    api: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name', 'type'],
} as const
