import type {
  ICreateAtomData,
  ICreateAtomSchemaBuilder,
} from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { filterNotHookType } from '@codelab/frontend-abstract-domain'
import {
  cdnEsmValidation,
  idSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-components-form/schema'
import { IAtomType } from '@codelab/shared-abstract-core'
import { SelectField } from 'uniforms-antd'

export const createAtomSchema: ICreateAtomSchemaBuilder = ({
  atoms,
  tags,
}): JSONSchemaType<ICreateAtomData> => {
  const atomTypes = Object.values(IAtomType).filter(filterNotHookType)

  return {
    title: 'Create Atom',
    type: 'object',
    required: ['name', 'type'],
    properties: {
      ...idSchema,
      name: {
        autoFocus: true,
        ...nonEmptyString,
      },
      type: {
        uniforms: {
          component: SelectField,
          options: atomTypes.map((type) => ({ label: type, value: type })),
          showSearch: true,
        },
        type: 'string',
      },
      // Hide field for now, added only to implement the interface
      // api: {
      //   type: 'string',
      //   nullable: true,
      //   uniforms: {
      //     component: () => null,
      //   },
      // },
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
              disabled: false,
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
              disabled: false,
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
        uniforms: { required: true },
      },
      externalSourceType: {
        nullable: true,
        pattern: '^[A-Z][a-zA-Z]*$',
        ...nonEmptyString,
        uniforms: { required: true },
      },
    },
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
  }
}
