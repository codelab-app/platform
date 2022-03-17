import { JSONSchemaType } from 'ajv'
import { CreateAtomInputSchema, createAtomSchema } from '../create-atom'

export type UpdateAtomInputSchema = CreateAtomInputSchema

export const updateAtomSchema: JSONSchemaType<UpdateAtomInputSchema> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
