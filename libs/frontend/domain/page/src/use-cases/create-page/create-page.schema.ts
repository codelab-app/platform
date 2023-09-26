import type { ICreatePageData } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  appSchema,
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<Omit<ICreatePageData, 'kind'>> = {
  properties: {
    ...idSchema(),
    ...appSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    getServerSideProps: {
      nullable: true,
      type: 'string',
      uniforms: {
        component: CodeMirrorField({
          language: ICodeMirrorLanguage.Typescript,
        }),
      },
    },
    url: {
      type: 'string',
      label: 'Deployed Page URL',
      help: 'Leave blank to autogenerate value',
    },
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
