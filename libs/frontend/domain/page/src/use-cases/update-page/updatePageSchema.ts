import type { IUpdatePageData } from '@codelab/frontend/abstract/core'
import { idSchema } from '@codelab/frontend/shared/domain'
import {
  nonEmptyString,
  showFieldOnDev,
  titleCaseValidation,
} from '@codelab/frontend/shared/utils'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export type UpdatePageSchema = Omit<IUpdatePageData, 'pageContentContainer'>

export const updatePageSchema: JSONSchemaType<UpdatePageSchema> = {
  title: 'Update Page Input',
  type: 'object',
  properties: {
    ...idSchema,
    app: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
      },
      ...showFieldOnDev(),
      disabled: true,
      required: ['id'],
    },
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    getServerSideProps: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: CodeMirrorField({ language: CodeMirrorLanguage.Typescript }),
      },
    },
  },
  required: ['name', 'app'],
} as const
