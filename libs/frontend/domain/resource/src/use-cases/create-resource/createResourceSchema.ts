import type {
  ICreateResourceData,
  ICreateResourceDTO,
} from '@codelab/frontend/abstract/core'
import { idSchema, ownerSchema } from '@codelab/frontend/shared/domain'
import { nonEmptyString, showFieldOnDev } from '@codelab/frontend/shared/utils'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IResourceType } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createResourceSchema: JSONSchemaType<ICreateResourceData> = {
  title: 'Create Resource',
  type: 'object',
  properties: {
    ...idSchema,
    ...ownerSchema,
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
  },
  required: ['name', 'type'],
} as const
