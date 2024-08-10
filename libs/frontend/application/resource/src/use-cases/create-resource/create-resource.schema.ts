import { CodeMirrorField } from '@codelab/frontend-presentation-components-form'
import {
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import type { ICreateResourceData } from '@codelab/shared/abstract/core'
import { IResourceType } from '@codelab/shared/abstract/core'
import { CodeMirrorLanguage } from '@codelab/shared/infra/gql'
import type { JSONSchemaType } from 'ajv'

export const createResourceSchema: JSONSchemaType<ICreateResourceData> = {
  properties: {
    ...idSchema(),
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
          nullable: true,
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
