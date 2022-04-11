import { IUpdateAtomDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { createAtomSchema } from '../create-atom'

export const updateAtomSchema: JSONSchemaType<IUpdateAtomDTO> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
