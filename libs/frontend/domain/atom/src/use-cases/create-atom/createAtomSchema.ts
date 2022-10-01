import {
  filterNotHookType,
  ICreateAtomDTO,
} from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { ObjectTyped } from 'object-typed'

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
      type: 'string',
      autoFocus: true,
    },
    type: {
      type: 'string',
      enum: ObjectTyped.values(IAtomType).filter(filterNotHookType),
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
