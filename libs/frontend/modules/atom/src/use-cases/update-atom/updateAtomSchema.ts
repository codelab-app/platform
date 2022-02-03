import { JSONSchemaType } from 'ajv'
import { CreateAtomInput, createAtomSchema } from '../create-atom'

export const updateAtomSchema: JSONSchemaType<CreateAtomInput> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
