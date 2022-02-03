import { AtomCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export type CreateAtomInput = Pick<AtomCreateInput, 'name' | 'type'>

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    type: {
      type: 'string',
      enum: Object.keys(AtomType).filter(filterNotHookType) as Array<AtomType>,
    },
    // api: {
    //   type: 'string',
    //   nullable: true,
    // },
  },
  required: ['name', 'type'],
} as const
