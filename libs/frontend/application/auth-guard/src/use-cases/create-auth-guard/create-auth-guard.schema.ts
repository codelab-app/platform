import type { ICreateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { SelectResource } from '@codelab/frontend/application/type'
import {
  CodeMirrorField,
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const createAuthGuardSchema: JSONSchemaType<ICreateAuthGuardData> = {
  properties: {
    ...idSchema(),
    canActivate: {
      type: 'string',
      uniforms: {
        component: CodeMirrorField({
          language: CodeMirrorLanguage.Typescript,
        }),
      },
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    resource: {
      nullable: true,
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
  },
  required: ['name', 'canActivate'],
  title: 'Create Auth Guard',
  type: 'object',
} as const
