import type { ICreateRedirectSchemaBuilder } from '@codelab/frontend-abstract-domain'

import { idSchema } from '@codelab/frontend-presentation-components-form/schema'
import { IRedirectTargetType } from '@codelab/shared-abstract-core'
import { SelectField } from 'uniforms-antd'

export const createRedirectSchema: ICreateRedirectSchemaBuilder = ({
  authGuards,
  pages,
}) => {
  return {
    properties: {
      ...idSchema,
      source: {
        // auto selected
        type: 'object',
        label: '',
        properties: {
          id: {
            disabled: true,
            label: 'Source',
            type: 'string',
          },
        },
        required: ['id'],
      },
      authGuard: {
        type: 'object',
        label: '',
        properties: {
          ...idSchema({
            disabled: false,
            label: 'Auth Guard',
            uniforms: {
              component: SelectField,
              options: authGuards,
            },
          }),
        },
        required: ['id'],
      },
      targetType: {
        type: 'string',
        enum: Object.values(IRedirectTargetType),
      },
      targetPage: {
        type: 'object',
        nullable: true,
        properties: {
          ...idSchema({
            disabled: false,
            label: 'Target Page',
            uniforms: {
              component: SelectField,
              options: pages,
            },
          }),
        },
        label: '',
        required: ['id'],
      },
      targetUrl: {
        nullable: true,
        type: 'string',
      },
    },
    allOf: [
      {
        if: { properties: { targetType: { const: IRedirectTargetType.Page } } },
        then: { required: ['targetPage'] },
      },
      {
        if: { properties: { targetType: { const: IRedirectTargetType.Url } } },
        then: { required: ['targetUrl'] },
      },
    ],
    required: ['authGuard', 'id', 'source', 'targetType'],
    title: 'Create Redirect',
    type: 'object',
  } as const
}
