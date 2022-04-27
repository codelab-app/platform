import {
  filterNotHookType,
  IAtomType,
  IUpdateAtomDTO,
} from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updateAtomSchema: JSONSchemaType<IUpdateAtomDTO> = {
  title: 'Update Atom Input',
  type: 'object',
  properties: {
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
  required: ['name', 'type'],
} as const
