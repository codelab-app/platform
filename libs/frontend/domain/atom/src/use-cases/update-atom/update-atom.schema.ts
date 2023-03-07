import type { IUpdateAtomData } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import { nonEmptyString } from '@codelab/frontend/view/components'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateAtomSchema: JSONSchemaType<IUpdateAtomData> = {
  properties: {
    allowedChildren: {
      items: {
        type: 'string',
      },
      nullable: true,
      showSearch: true,
      type: 'array',
    },
    id: {
      nullable: true,
      type: 'string',
      uniforms: {
        component: () => null,
      },
    },

    name: {
      autoFocus: true,
      ...nonEmptyString,
    },

    tags: {
      items: {
        properties: {
          id: {
            type: 'string',
          },
        },
        required: ['id'],
        type: 'object',
      },
      nullable: true,
      showSearch: true,
      type: 'array',
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
      enum: Object.values(IAtomType).filter(filterNotHookType),
      showSearch: true,
      type: 'string',
    },
  },
  required: ['name', 'type'],
  title: 'Update Atom Input',
  type: 'object',
} as const
