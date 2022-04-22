import {
  AtomType,
  filterNotHookType,
  ICreateAtomDTO,
} from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createAtomSchema: JSONSchemaType<ICreateAtomDTO> = {
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
        nullable: true,
        showSearch: true,
      },
    } as any),
  },
  required: ['name', 'type'],
} as const
