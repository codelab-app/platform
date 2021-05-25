import { JSONSchemaType } from 'ajv'
import { CreateAtomInput, createAtomSchema } from '../createAtom'

export type UpdateAtomInput = CreateAtomInput
export const updateAtomSchema: JSONSchemaType<UpdateAtomInput> = {
  title: 'Update Atom Input',
  type: 'object',
  properties: createAtomSchema.properties,
  required: createAtomSchema.required,
} as const
