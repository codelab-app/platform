import type { IUpdateAtomSchemaBuilder } from '@codelab/frontend-abstract-domain'

import { filterNotHookType } from '@codelab/frontend-abstract-domain'
import {
  cdnEsmValidation,
  idSchema,
  nonEmptyString,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import { IAtomType } from '@codelab/shared-abstract-core'
import { SelectField } from 'uniforms-antd'

export const updateAtomSchema: IUpdateAtomSchemaBuilder = ({ atoms, tags }) => {
  const atomTypes = Object.values(IAtomType).filter(filterNotHookType)

  return {
    properties: {
      ...idSchema(),
      name: {
        autoFocus: true,
        ...nonEmptyString,
      },
      ...refSchema('api', { disabled: true }),
      // Hide field for now, added only to implement the interface
      // api: {
      //   type: 'string',
      //   nullable: true,
      //   uniforms: {
      //     component: () => null,
      //   },
      // },
      type: {
        uniforms: {
          component: SelectField,
          options: atomTypes.map((type) => ({ label: type, value: type })),
          showSearch: true,
        },
        type: 'string',
      },
      tags: {
        items: {
          properties: {
            ...idSchema({
              label: 'Connect Tag',
              uniforms: {
                component: SelectField,
                mode: 'multiple',
                optionFilterProp: 'label',
                options: tags,
                showSearch: true,
              },
            }),
          },
          required: ['id'],
          type: 'object',
        },
        nullable: true,
        showSearch: true,
        type: 'array',
      },
      requiredParents: {
        items: {
          type: 'object',
          properties: {
            ...idSchema({
              label: 'Required Parents',
              uniforms: {
                component: SelectField,
                options: atoms,
              },
            }),
          },
          required: ['id'],
        },
        nullable: true,
        showSearch: true,
        type: 'array',
      },
      suggestedChildren: {
        items: {
          type: 'object',
          properties: {
            ...idSchema({
              label: 'Suggested Children',
              uniforms: {
                component: SelectField,
                mode: 'multiple',
                optionFilterProp: 'label',
                options: atoms,
                showSearch: true,
              },
            }),
          },
          required: ['id'],
        },
        nullable: true,
        showSearch: true,
        type: 'array',
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
}
