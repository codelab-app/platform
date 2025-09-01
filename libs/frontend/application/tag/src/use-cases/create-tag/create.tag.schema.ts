import type { ICreateTagSchemaBuilder } from '@codelab/frontend-abstract-domain'

import {
  idSchema,
  nonEmptyString,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import { SelectField } from 'uniforms-antd'

export const createTagSchema: ICreateTagSchemaBuilder = ({ tags }) =>
  ({
    properties: {
      ...idSchema(),
      name: {
        autoFocus: true,
        ...nonEmptyString,
      },
      parent: {
        nullable: true,
        properties: {
          ...idSchema({
            uniforms: {
              component: SelectField,
              options: tags,
            },
          }),
        },
        default: null,
        required: [],
        type: 'object',
      },
      ...refSchema('owner'),
    },
    required: ['id', 'name', 'owner'],
    title: 'Create Tag Input',
    type: 'object',
  } as const)
