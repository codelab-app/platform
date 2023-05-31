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
    externalCssSource: {
      nullable: true,
      ...nonEmptyString,
    },
    externalJsSource: {
      nullable: true,
      ...nonEmptyString,
    },
    externalSourceType: {
      nullable: true,
      ...nonEmptyString,
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
  title: 'Create Atom',
  type: 'object',
  required: ['name', 'type', 'owner'],
  if: {
    properties: {
      type: {
        const: 'ExternalComponent',
      },
    },
  },
  then: {
    required: [
      'name',
      'type',
      'owner',
      'externalJsSource',
      'externalSourceType',
    ],
  },
} as const
