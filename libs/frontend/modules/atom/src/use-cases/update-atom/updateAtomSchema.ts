import { JSONSchemaType } from 'ajv'
import { createAtomSchema } from '../create-atom'
import { UpdateAtomMutationVariables } from './UpdateAtom.api.graphql'

export type UpdateAtomSchema = UpdateAtomMutationVariables['input']['data']

export const updateAtomSchema: JSONSchemaType<UpdateAtomSchema> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
