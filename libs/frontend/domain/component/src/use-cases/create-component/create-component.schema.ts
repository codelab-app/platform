import type { ICreateComponentData } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  idSchema,
  ownerSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<ICreateComponentData> = {
  properties: {
    ...idSchema,
    ...ownerSchema,
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
    keyGenerator: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: CodeMirrorField({
          language: CodeMirrorLanguage.Typescript,
        }),
      },
    },
  },
  required: ['name', 'owner', 'id'],
  title: 'Create Component Input',
  type: 'object',
}
