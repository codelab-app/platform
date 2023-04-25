import type { ICreateAtomData } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  nonEmptyString,
  ownerSchema,
} from '@codelab/frontend/presentation/view'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createAtomSchema: JSONSchemaType<ICreateAtomData> = {
  properties: {
    suggestedChildren: {
      items: {
        type: 'string',
      },
      nullable: true,
      showSearch: true,
      type: 'array',
    },
    ...idSchema,
    // Hide field for now, added only to implement the interface
    // api: {
    //   type: 'string',
    //   nullable: true,
    //   uniforms: {
    //     component: () => null,
    //   },
    // },
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    ...ownerSchema,
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
    type: {
      enum: Object.values(IAtomType).filter(filterNotHookType),
      showSearch: true,
      type: 'string',
    },
    requiredParents: {
      items: {
        type: 'string',
      },
      nullable: true,
      showSearch: true,
      type: 'array',
    },
  },
  required: ['name', 'type', 'owner'],
  title: 'Create Atom',
  type: 'object',
} as const
