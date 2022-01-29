import { CreateAtomInput } from '@codelab/shared/abstract/codegen'
import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import TreeSelectField from './helpers/TreeSelectField'

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
    api: {
      type: 'string',
      nullable: true,
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
      unfiorms: { component: TreeSelectField },
      nullable: true,
    },
  },
  required: ['name', 'type'],
} as const
