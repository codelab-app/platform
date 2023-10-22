import { type ICreateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { SelectResource } from '@codelab/frontend/application/type'
import {
  CodeMirrorField,
  CodeMirrorGraphqlField,
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  HttpMethod,
  HttpResponseType,
  IRedirectKind,
} from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import keys from 'lodash/keys'

export const createAuthGuardSchema: JSONSchemaType<ICreateAuthGuardData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    config: {
      label: '',
      properties: {
        ...idSchema(),
        data: {
          type: 'object',
          properties: {
            body: {
              nullable: true,
              type: 'string',
              uniforms: {
                component: CodeMirrorField({
                  language: CodeMirrorLanguage.Json,
                }),
              },
            },
            headers: {
              nullable: true,
              type: 'string',
              uniforms: {
                component: CodeMirrorField({
                  language: CodeMirrorLanguage.Json,
                }),
              },
            },
            method: {
              enum: keys(HttpMethod) as Array<HttpMethod>,
              showSearch: true,
              type: 'string',
            },
            query: {
              // nullable: true,
              type: 'string',
              uniforms: {
                component: CodeMirrorGraphqlField({}),
              },
            },
            queryParams: {
              nullable: true,
              type: 'string',
              uniforms: {
                component: CodeMirrorField({
                  language: CodeMirrorLanguage.Json,
                }),
              },
            },
            responseType: {
              enum: Object.values(HttpResponseType),
              showSearch: true,
              type: 'string',
            },
            urlSegment: {
              type: 'string',
            },
            variables: {
              nullable: true,
              type: 'string',
              uniforms: {
                component: CodeMirrorField({
                  language: CodeMirrorLanguage.Json,
                }),
              },
            },
          },
          required: [],
        },
      },
      required: [],
      type: 'object',
    },
    resource: {
      properties: {
        id: {
          type: 'string',
          label: '',
          uniforms: {
            component: SelectResource,
          },
        },
      },
      required: ['id'],
      type: 'object',
    },
    responseTransformer: {
      type: 'string',
      default: '// return response.Authenticated',
      help: 'Use "response" object to return a boolean',
      uniforms: {
        component: CodeMirrorField({
          language: CodeMirrorLanguage.Typescript,
        }),
      },
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
          },
          required: ['id'],
          type: 'object',
        },
        {
          properties: {
            url: {
              type: 'string',
            },
            __typename: {
              enum: [IRedirectKind.Url],
              label: 'Redirect Type',
              type: 'string',
            },
          },
          required: ['url'],
          type: 'object',
        },
      ],
    },
  },
  required: ['name', 'resource', 'config', 'responseTransformer', 'redirect'],
  title: 'Create Auth Guard',
  type: 'object',
} as const
