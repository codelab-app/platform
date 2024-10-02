import type { ICreateRedirectData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'

import {
  SelectAuthGuard,
  SelectPage,
} from '@codelab/frontend/presentation/components/interface-form'
import { idSchema } from '@codelab/frontend-presentation-components-form/schema'
import { IRedirectTargetType } from '@codelab/shared/abstract/core'

export const createRedirectSchema: JSONSchemaType<ICreateRedirectData> = {
  properties: {
    ...idSchema(),
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
        id: {
          type: 'string',
          label: 'Auth Guard',
          uniforms: {
            component: SelectAuthGuard,
          },
        },
      },
      required: ['id'],
    },
    targetType: {
      type: 'string',
      enum: Object.values(IRedirectTargetType),
    },
    targetPage: {
      type: 'object',
      label: '',
      nullable: true,
      properties: {
        id: {
          type: 'string',
          label: 'Target Page',
          uniforms: {
            component: SelectPage,
          },
        },
      },
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
