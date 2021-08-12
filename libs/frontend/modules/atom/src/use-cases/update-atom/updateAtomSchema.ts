import { CreateAtomInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'
import { createAtomSchema } from '../create-atom'

export type UpdateAtomInput = CreateAtomInput

export const updateAtomSchema: JSONSchemaType<UpdateAtomInput> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
