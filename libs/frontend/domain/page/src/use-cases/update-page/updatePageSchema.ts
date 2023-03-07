import type { IUpdatePageData } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  idSchema,
  nonEmptyString,
  showFieldOnDev,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export type UpdatePageSchema = Omit<IUpdatePageData, 'pageContentContainer'>

export const updatePageSchema: JSONSchemaType<UpdatePageSchema> = {
  properties: {
    ...idSchema,
    app: {
      properties: {
        id: {
          disabled: true,
          type: 'string',
        },
      },
      type: 'object',
      ...showFieldOnDev(),
      required: ['id'],
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
  required: ['name', 'app'],
  title: 'Update Page Input',
  type: 'object',
} as const
