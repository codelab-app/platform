import { AtomType, CreateAtomInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    label: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: Object.keys(AtomType) as Array<AtomType>,
    },
  },
  required: ['name', 'label', 'type'],
} as const
