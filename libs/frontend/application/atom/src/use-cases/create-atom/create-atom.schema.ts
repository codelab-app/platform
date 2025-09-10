import type {
  ICreateAtomData,
  ICreateAtomSchemaBuilder,
} from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { filterNotHookType } from '@codelab/frontend-abstract-domain'
import {
  cdnEsmValidation,
  idSchema,
  multiSelectFieldSchema,
  nonEmptyString,
} from '@codelab/frontend-presentation-components-form/schema'
import { IAtomType } from '@codelab/shared-abstract-core'
import { SelectField } from 'uniforms-antd'

export const createAtomSchema: ICreateAtomSchemaBuilder = ({
  atoms,
  tagsOptions,
}): JSONSchemaType<ICreateAtomData> => {
  const atomTypes = Object.values(IAtomType).filter(filterNotHookType)

  const tags = multiSelectFieldSchema('tags', 'Connect Tag', {
    options: tagsOptions,
  })

  const requiredParents = multiSelectFieldSchema(
    'requiredParents',
    'Required Parents',
    {
      options: atoms,
    },
  )

  const suggestedChildren = multiSelectFieldSchema(
    'suggestedChildren',
    'Suggested Children',
    {
      options: atoms,
    },
  )

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
      ...tags,
      ...requiredParents,
      ...suggestedChildren,
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
