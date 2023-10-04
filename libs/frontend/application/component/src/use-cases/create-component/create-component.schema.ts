import type { ICreateComponentData } from '@codelab/frontend/abstract/domain'
import {
  CodeMirrorField,
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<
  Omit<ICreateComponentData, 'rootElement'>
> = {
  properties: {
    ...idSchema(),
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
  required: ['name', 'id'],
  title: 'Create Component Input',
  type: 'object',
}