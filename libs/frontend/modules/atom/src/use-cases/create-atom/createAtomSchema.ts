import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { CreateAtomMutationInput } from './types'

export const createAtomSchema: JSONSchemaType<CreateAtomMutationInput> = {
  title: 'Create Atom Input',
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
    api: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name', 'type'],
} as const
