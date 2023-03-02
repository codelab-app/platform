import type { ICreateResourceDTO } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IResourceType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createResourceSchema: JSONSchemaType<ICreateResourceDTO> = {
  title: 'Create Resource',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    type: {
      type: 'string',
      enum: Object.values(IResourceType),
      showSearch: true,
    },
    config: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        headers: {
          type: 'string',
          uniforms: {
            component: CodeMirrorField({
              language: CodeMirrorLanguage.Json,
            }),
          },
        },
      },
      label: '',
      required: ['url'],
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'type'],
} as const
