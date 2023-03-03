import type { ICreatePageDTO } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  hideField,
  nonEmptyString,
  showFieldOnDev,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageData> = {
  properties: {
    ...idSchema,
    ...ownerSchema,
    app: {
      properties: {
        id: {
          disabled: true,
          type: 'string',
          ...showFieldOnDev(),
        },
      },
      required: ['id'],
      type: 'object',
    },
    getServerSideProps: {
      nullable: true,
      type: 'string',
      uniforms: {
        component: CodeMirrorField({ language: CodeMirrorLanguage.Typescript }),
      },
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
