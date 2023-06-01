import type { ICreateResourceData } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  idSchema,
  nonEmptyString,
  ownerSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IResourceType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createResourceSchema: JSONSchemaType<ICreateResourceData> = {
  properties: {
    ...idSchema,
    ...ownerSchema,
    config: {
      label: '',
      properties: {
        headers: {
          type: 'string',
          uniforms: {
            component: CodeMirrorField({
              language: CodeMirrorLanguage.Json,
            }),
          },
        },
        url: { type: 'string' },
      },
      required: ['url'],
      type: 'object',
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    type: {
      enum: Object.values(IResourceType),
      showSearch: true,
      type: 'string',
    },
  },
  required: ['name', 'type'],
  title: 'Create Resource',
  type: 'object',
} as const
