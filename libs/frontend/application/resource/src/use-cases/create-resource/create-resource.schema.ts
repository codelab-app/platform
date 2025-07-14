import type { ICreateResourceData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import { CodeMirrorField } from '@codelab/frontend-presentation-components-form'
import {
  idSchema,
  nonEmptyString,
  refSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'
import { IResourceType } from '@codelab/shared-abstract-core'
import { CodeMirrorLanguage } from '@codelab/shared-infra-gqlgen'

export const createResourceSchema: JSONSchemaType<ICreateResourceData> = {
  properties: {
    ...idSchema(),
    config: {
      label: '',
      properties: {
        headers: {
          type: 'string',
          uniforms: {
            component: CodeMirrorField,
            language: CodeMirrorLanguage.Json,
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
      allowedValues: Object.values(IResourceType),
      showSearch: true,
      type: 'string',
    },
    ...refSchema('owner'),
  },
  required: ['name', 'type', 'owner'],
  title: 'Create Resource',
  type: 'object',
} as const
