import { JSONSchemaType } from 'ajv'
import { CreateAtomInputSchema, createAtomSchema } from '../create-atom'

export const updateAtomSchema: JSONSchemaType<CreateAtomInputSchema> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
