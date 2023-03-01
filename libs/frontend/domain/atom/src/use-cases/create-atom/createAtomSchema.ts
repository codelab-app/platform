import type { ICreateAtomData } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import { nonEmptyString, showFieldOnDev } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createAtomSchema: JSONSchemaType<ICreateAtomData> = {
  title: 'Create Atom',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: () => null,
      },
    },
    owner: {
      type: 'object',
      properties: {
        auth0Id: {
          type: 'string',
          disabled: true,
          ...showFieldOnDev(),
        },
      },
      required: ['auth0Id'],
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
  required: ['name', 'type', 'owner'],
} as const
