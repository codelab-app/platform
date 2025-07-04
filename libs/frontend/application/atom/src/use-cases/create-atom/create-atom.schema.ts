import type { ICreateAtomData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { filterNotHookType } from '@codelab/frontend-abstract-domain'
import {
  cdnEsmValidation,
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-components-form/schema'
import { IAtomType } from '@codelab/shared-abstract-core'

export const createAtomSchema: JSONSchemaType<ICreateAtomData> = {
  properties: {
    suggestedChildren: {
      items: {
        type: 'object',
        properties: {
          ...idSchema(),
        },
        required: ['id'],
      },
      nullable: true,
      showSearch: true,
      type: 'array',
    },
    ...idSchema(),
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
    tags: {
      items: {
        properties: {
          ...idSchema(),
        },
        required: ['id'],
        type: 'object',
      },
      nullable: true,
      showSearch: true,
      type: 'array',
    },
    type: {
      allowedValues: Object.values(IAtomType).filter(filterNotHookType),
      showSearch: true,
      type: 'string',
    },
    externalCssSource: {
      nullable: true,
      ...nonEmptyString,
    },
    externalJsSource: {
      nullable: true,
      ...cdnEsmValidation,
      ...nonEmptyString,
    },
    externalSourceType: {
      nullable: true,
      pattern: '^[A-Z][a-zA-Z]*$',
      ...nonEmptyString,
    },
    requiredParents: {
      items: {
        type: 'object',
        properties: {
          ...idSchema(),
        },
        required: ['id'],
      },
      nullable: true,
      showSearch: true,
      type: 'array',
    },
  },
  title: 'Create Atom',
  type: 'object',
  required: ['name', 'type'],
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
