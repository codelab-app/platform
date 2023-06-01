import type { IUpdateAtomData } from '@codelab/frontend/abstract/core'
import { filterNotHookType } from '@codelab/frontend/abstract/core'
import {
  cdnEsmValidation,
  idSchema,
  nonEmptyString,
} from '@codelab/frontend/presentation/view'
import { IAtomType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updateAtomSchema: JSONSchemaType<IUpdateAtomData> = {
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
    name: {
      autoFocus: true,
      ...nonEmptyString,
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
    // Hide field for now, added only to implement the interface
    // api: {
    //   type: 'string',
    //   nullable: true,
    //   uniforms: {
    //     component: () => null,
    //   },
    // },
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
        type: 'string',
      },
      nullable: true,
      showSearch: true,
      type: 'array',
    },
  },
  title: 'Update Atom Input',
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
    required: ['name', 'type', 'externalJsSource', 'externalSourceType'],
  },
} as const
