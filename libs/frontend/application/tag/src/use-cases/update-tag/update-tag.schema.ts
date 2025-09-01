import type { IUpdateTagSchemaBuilder } from '@codelab/frontend-abstract-domain'

import {
  idSchema,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import { SelectField } from 'uniforms-antd'

export const updateTagSchema: IUpdateTagSchemaBuilder = ({ tags }) =>
  ({
    properties: {
      ...idSchema(),
      name: {
        autoFocus: true,
        type: 'string',
      },
      parent: {
        type: 'object',
        nullable: true,
        properties: {
          ...idSchema({
            disabled: false,
            label: 'Parent Tag',
            uniforms: {
              component: SelectField,
              options: tags,
            },
          }),
        },
        label: '',
        required: ['id'],
      },
      ...refSchema('owner'),
    },
    required: ['name', 'owner'],
    title: 'Update Tag Input',
    type: 'object',
  } as const)
