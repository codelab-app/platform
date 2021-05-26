import { AtomType } from '@codelab/graphql'
import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  type: AtomType
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
  },
  required: ['type'],
} as const
