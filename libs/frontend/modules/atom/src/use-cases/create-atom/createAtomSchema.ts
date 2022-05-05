import {
  filterNotHookType,
  IAtomType,
  ICreateAtomDTO,
} from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

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
      enum: Object.keys(IAtomType).filter(
        filterNotHookType,
      ) as Array<IAtomType>,
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
  },
  required: ['name', 'type', 'owner'],
} as const
