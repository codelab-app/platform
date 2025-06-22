import type { ICreateActionData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  CodeMirrorField,
  CodeMirrorGraphqlField,
} from '@codelab/frontend-presentation-components-form'
import {
  idSchema,
  nonEmptyString,
  refMaybeSchema,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
} from '@codelab/shared-abstract-core'
import { CodeMirrorLanguage } from '@codelab/shared-infra-gqlgen'
import { keys } from 'remeda'

export const createActionSchema: JSONSchemaType<ICreateActionData> = {
  properties: {
    ...idSchema(),
    code: {
      type: 'string',
      uniforms: {
        component: CodeMirrorField({
          language: CodeMirrorLanguage.Typescript,
        }),
      },
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
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    ...refSchema('resource'),
    ...refSchema('store', { disabled: true }),
    ...refMaybeSchema('errorAction', { label: 'Error Action' }),
    ...refMaybeSchema('successAction', {
      label: 'Success Action',
    }),
    type: {
      allowedValues: Object.values(IActionKind),
      type: 'string',
    },
  },
  required: ['name', 'type', 'store'],
  title: 'Create Action',
  type: 'object',
}
