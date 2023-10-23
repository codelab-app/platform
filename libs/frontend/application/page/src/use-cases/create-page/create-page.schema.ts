import type { ICreatePageData } from '@codelab/frontend/abstract/domain'
import { SelectAuthGuard, SelectPage } from '@codelab/frontend/application/type'
import {
  appSchema,
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<Omit<ICreatePageData, 'kind'>> = {
  properties: {
    ...idSchema(),
    ...appSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    authGuard: {
      nullable: true,
      properties: {
        id: {
          type: 'string',
        },
        authGuard: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              label: '',
              uniforms: {
                component: SelectAuthGuard,
              },
            },
          },
          required: ['id'],
        },
        redirect: {
          oneOf: [
            {
              properties: {
                id: {
                  type: 'string',
                },
                __typename: {
                  enum: [IRedirectKind.Page],
                  label: 'Redirect Type',
                  type: 'string',
                },
                page: {
                  type: 'object',
                  required: ['id'],
                  properties: {
                    id: {
                      type: 'string',
                      label: '',
                      uniforms: {
                        component: SelectPage,
                      },
                    },
                  },
                },
              },
              required: ['page', '__typename', 'id'],
              type: 'object',
            },
            {
              properties: {
                url: {
                  type: 'string',
                },
                id: {
                  type: 'string',
                },
                __typename: {
                  enum: [IRedirectKind.Url],
                  label: 'Redirect Type',
                  type: 'string',
                },
              },
              required: ['url', '__typename', 'id'],
              type: 'object',
            },
          ],
        },
      },
      required: ['id', 'redirect', 'authGuard'],
      type: 'object',
    },
    url: {
      type: 'string',
      label: 'Deployed Page URL',
      help: 'Leave blank to autogenerate value',
    },
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
