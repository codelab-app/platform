'use client'

import type { JSONSchemaType } from 'ajv'

import { type IAuthGuardCreateFormData } from '@codelab/frontend-abstract-domain'
import { SelectResource } from '@codelab/frontend-presentation-components-interface-form'
import {
  CodeMirrorField,
  CodeMirrorGraphqlField,
} from '@codelab/frontend-presentation-components-form'
import {
  idSchema,
  nonEmptyString,
  ownerSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { HttpMethod, HttpResponseType } from '@codelab/shared-abstract-core'
import { CodeMirrorLanguage } from '@codelab/shared-infra-gqlgen'
import { keys } from 'remeda'

export const createAuthGuardSchema: JSONSchemaType<IAuthGuardCreateFormData> = {
  properties: {
    ...idSchema(),
    ...ownerSchema,
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
              allowedValues: keys(HttpMethod) as Array<HttpMethod>,
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
              allowedValues: Object.values(HttpResponseType),
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
  },
  required: ['name', 'resource', 'config', 'responseTransformer'],
  title: 'Create Auth Guard',
  type: 'object',
} as const
