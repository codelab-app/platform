'use client'

import type { ICreateActionSchemaBuilder } from '@codelab/frontend-abstract-domain'

import {
  CodeMirrorField,
  CodeMirrorGraphqlField,
} from '@codelab/frontend-presentation-components-form'
import {
  idSchema,
  nonEmptyString,
  refSchema,
} from '@codelab/frontend-presentation-components-form/schema'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
} from '@codelab/shared-abstract-core'
import { CodeMirrorLanguage } from '@codelab/shared-infra-gqlgen'
import { keys } from 'remeda'
import { SelectField } from 'uniforms-antd'

export const createActionSchema: ICreateActionSchemaBuilder = ({
  actions,
  resources,
}) =>
  ({
    properties: {
      ...idSchema,
      code: {
        type: 'string',
        uniforms: {
          component: CodeMirrorField,
          language: CodeMirrorLanguage.Typescript,
        },
      },
      config: {
        label: '',
        properties: {
          ...idSchema,
          data: {
            type: 'object',
            properties: {
              body: {
                nullable: true,
                type: 'string',
                uniforms: {
                  component: CodeMirrorField,
                  language: CodeMirrorLanguage.Json,
                },
              },
              headers: {
                nullable: true,
                type: 'string',
                uniforms: {
                  component: CodeMirrorField,
                  language: CodeMirrorLanguage.Json,
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
                  component: CodeMirrorGraphqlField,
                },
              },
              queryParams: {
                nullable: true,
                type: 'string',
                uniforms: {
                  component: CodeMirrorField,
                  language: CodeMirrorLanguage.Json,
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
                  component: CodeMirrorField,
                  language: CodeMirrorLanguage.Json,
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
      resource: {
        type: 'object',
        properties: {
          ...idSchema({
            disabled: false,
            label: 'Resource',
            uniforms: {
              component: SelectField,
              options: resources,
            },
          }),
        },
        label: '',
        required: ['id'],
      },
      ...refSchema('store', 'Store'),
      errorAction: {
        type: 'object',
        nullable: true,
        properties: {
          ...idSchema({
            disabled: false,
            label: 'Error Action',
            uniforms: {
              component: SelectField,
              options: actions,
            },
          }),
        },
        label: '',
        required: ['id'],
      },
      successAction: {
        type: 'object',
        nullable: true,
        properties: {
          ...idSchema({
            disabled: false,
            label: 'Success Action',
            uniforms: {
              component: SelectField,
              options: actions,
            },
          }),
        },
        label: '',
        required: ['id'],
      },
      type: {
        allowedValues: Object.values(IActionKind),
        type: 'string',
      },
    },
    required: ['name', 'type', 'store'],
    title: 'Create Action',
    type: 'object',
  } as const)
