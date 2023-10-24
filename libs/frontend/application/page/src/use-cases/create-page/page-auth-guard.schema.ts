import type { ICreatePageData } from '@codelab/frontend/abstract/domain'
import { SelectAuthGuard, SelectPage } from '@codelab/frontend/application/type'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

export const pageAuthGuardSchema: PropertiesSchema<
  Pick<ICreatePageData, 'authGuard'>
> = {
  authGuard: {
    nullable: true,
    properties: {
      authGuard: {
        properties: {
          id: {
            label: '',
            type: 'string',
            uniforms: {
              component: SelectAuthGuard,
            },
          },
        },
        required: ['id'],
        type: 'object',
      },
      id: {
        type: 'string',
      },
      redirect: {
        type: 'object',
        properties: {
          kind: {
            enum: Object.values(IRedirectKind),
            label: 'Redirect Type',
            type: 'string',
          },
          id: {
            type: 'string',
          },
          page: {
            label: '',
            properties: {
              id: {
                label: '',
                type: 'string',
                uniforms: {
                  component: SelectPage,
                },
              },
            },
            required: ['id'],
            type: 'object',
          },
          url: {
            type: 'string',
          },
        },
        required: ['id', 'kind'],
      },
    },
    required: ['id', 'redirect', 'authGuard'],
    type: 'object',
  },
}
