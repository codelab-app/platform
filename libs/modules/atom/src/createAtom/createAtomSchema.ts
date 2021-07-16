import { AtomType, CreateAtomInput } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
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
  },
  required: ['name', 'type'],
} as const
