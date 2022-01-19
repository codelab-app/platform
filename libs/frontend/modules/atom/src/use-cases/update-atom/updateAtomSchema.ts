import {
  CreateAtomInput,
  UpdateAtomInput,
} from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'
import { createAtomSchema } from '../create-atom'

export const updateAtomSchema: JSONSchemaType<CreateAtomInput> = {
  ...createAtomSchema,
  title: 'Update Atom Input',
} as const
