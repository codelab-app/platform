import { JSONSchemaType } from 'ajv'
import { UpdateAtomMutationVariables } from '../atom.endpoints.graphql.gen'
import { createAtomSchema } from '../create-atom'

export type UpdateAtomSchema = UpdateAtomMutationVariables['input']['data']

export const updateAtomSchema: JSONSchemaType<UpdateAtomSchema> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
