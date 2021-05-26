import { JSONSchemaType } from 'ajv'
import { CreateAtomInput, createAtomSchema } from '../createAtom'

export type UpdateAtomInput = CreateAtomInput

export const updateAtomSchema: JSONSchemaType<UpdateAtomInput> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
