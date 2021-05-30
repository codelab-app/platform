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
      enum: Object.keys(AtomType) as Array<AtomType>,
    },
  },
  required: ['label', 'type'],
} as const
