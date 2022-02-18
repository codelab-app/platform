import { AtomCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { TreeSelectField } from '../components'

export type CreateAtomInput = Pick<AtomCreateInput, 'name' | 'type' | 'tags'>

export const createAtomSchema: JSONSchemaType<CreateAtomInput> = {
  title: 'Create Atom',
  type: 'object',
  properties: {
    ...({
      name: {
        type: 'string',
        autoFocus: true,
      },
      type: {
        type: 'string',
        enum: Object.keys(AtomType).filter(
          filterNotHookType,
        ) as Array<AtomType>,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
        },
        uniforms: {
          component: TreeSelectField,
        },
        nullable: true,
      },
    } as any),
    // api: {
    //   type: 'string',
    //   nullable: true,
    // },
  },
  required: ['name', 'type'],
} as const
