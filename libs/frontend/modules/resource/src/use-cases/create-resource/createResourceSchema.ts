import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  ICreateResourceDTO,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { keys } from 'lodash'

export const createResourceSchema: JSONSchemaType<ICreateResourceDTO> = {
  title: 'Create Resource',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    type: {
      type: 'string',
      enum: keys(IResourceType) as Array<IResourceType>,
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
