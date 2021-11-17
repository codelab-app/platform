import { JSONSchemaType } from 'ajv'
import { createAtomSchema } from '../create-atom'
import { UpdateAtomMutationInput } from './types'

export const updateAtomSchema: JSONSchemaType<UpdateAtomMutationInput> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
