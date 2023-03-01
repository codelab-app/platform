import type { IUpdateAtomData } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import { nonEmptyString } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateAtomSchema: JSONSchemaType<IUpdateAtomData> = {
  title: 'Update Atom Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    // Hide field for now, added only to implement the interface
    // api: {
    //   type: 'string',
    //   nullable: true,
    //   uniforms: {
    //     component: () => null,
    //   },
    // },
    type: {
      type: 'string',
      enum: Object.values(IAtomType).filter(filterNotHookType),
      showSearch: true,
    },
    tags: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
        required: ['id'],
      },
      nullable: true,
      showSearch: true,
    },
    allowedChildren: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
      showSearch: true,
    },
  },
  required: ['name', 'type'],
} as const
