import { AtomType } from '@codelab/graphql'
import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = {
  label: string
  type: AtomType
}

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
  required: ['type'],
} as const
