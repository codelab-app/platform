import { CreateAtomInput } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'
import { createAtomSchema } from '../createAtom'

export type UpdateAtomInput = CreateAtomInput

export const updateAtomSchema: JSONSchemaType<UpdateAtomInput> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
