import type { ICreateAtomData } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createAtomSchema: JSONSchemaType<ICreateAtomData> = {
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
    owner: {
      properties: {
        auth0Id: {
          disabled: true,
          type: 'string',
          ...showFieldOnDev(),
        },
      },
      required: ['auth0Id'],
      type: 'object',
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
    type: {
      enum: Object.values(IAtomType).filter(filterNotHookType),
      showSearch: true,
      type: 'string',
    },
  },
  required: ['name', 'type', 'owner'],
  title: 'Create Atom',
  type: 'object',
} as const
