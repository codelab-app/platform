import { AtomType, filterNotHookType } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { JSONSchemaType } from 'ajv'
import { TreeSelectField } from '../components'

export type CreateAtomInputSchema = {
  name: string
  type: AtomType
  tags: Nullish<Array<string>>
}

export const createAtomSchema: JSONSchemaType<CreateAtomInputSchema> = {
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
        showSearch: true,
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
        },
        uniforms: {
          component: TreeSelectField,
        },
        showSearch: true,
        nullable: true,
      },
    } as any),
  },
  required: ['name', 'type'],
} as const
