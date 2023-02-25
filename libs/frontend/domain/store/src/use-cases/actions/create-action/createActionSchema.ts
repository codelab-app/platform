import type { ICreateActionDTO } from '@codelab/frontend/abstract/core'
import { HttpMethod, HttpResponseType } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/shared/utils'
import {
  CodeMirrorField,
  CodeMirrorGraphqlField,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'
import keys from 'lodash/keys'

export const createActionSchema: JSONSchemaType<ICreateActionDTO> = {
  title: 'Create Action',
  type: 'object',
  properties: {
    ...idSchema,
    storeId: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
    },
    type: {
      type: 'string',
      enum: Object.values(IActionKind),
    },
    resourceId: {
      type: 'string',
      nullable: true,
      label: 'Resource',
    },
    successActionId: {
      type: 'string',
      nullable: true,
      label: 'Success Action',
    },
    errorActionId: {
      type: 'string',
      nullable: true,
      label: 'Error Action',
    },
    config: {
      type: 'object',
      label: '',
      nullable: true,
      properties: {
        query: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: CodeMirrorGraphqlField({}),
          },
        },
        variables: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: CodeMirrorField({
              language: CodeMirrorLanguage.Json,
            }),
          },
        },
        body: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: CodeMirrorField({
              language: CodeMirrorLanguage.Json,
            }),
          },
        },
        urlSegment: {
          type: 'string',
          nullable: true,
        },
        method: {
          type: 'string',
          enum: keys(HttpMethod) as Array<HttpMethod>,
          showSearch: true,
        },
        queryParams: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: CodeMirrorField({
              language: CodeMirrorLanguage.Json,
            }),
          },
        },
        headers: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: CodeMirrorField({
              language: CodeMirrorLanguage.Json,
            }),
          },
        },
        responseType: {
          type: 'string',
          enum: Object.values(HttpResponseType),
          showSearch: true,
        },
      },
      required: [],
    },
    code: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: CodeMirrorField({
          language: CodeMirrorLanguage.Typescript,
        }),
      },
    },
  },
  required: ['name', 'type', 'storeId'],
}
