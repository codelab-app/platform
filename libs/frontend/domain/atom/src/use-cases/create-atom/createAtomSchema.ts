import type { ICreateAtomDTO } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import {
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createAtomSchema: JSONSchemaType<ICreateAtomDTO> = {
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
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    // Hide field for now, added only to implement the interface
    api: {
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
    type: {
      type: 'string',
      enum: Object.values(IAtomType).filter(filterNotHookType),
      showSearch: true,
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
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
