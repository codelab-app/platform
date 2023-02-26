import type { ICreatePageData } from '@codelab/frontend/abstract/core'
import { idSchema, ownerSchema } from '@codelab/frontend/shared/domain'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
  titleCaseValidation,
} from '@codelab/frontend/shared/utils'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageData> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    ...idSchema,
    ...ownerSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    app: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          disabled: true,
          ...showFieldOnDev(),
        },
      },
      required: ['id'],
    },
    getServerSideProps: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: CodeMirrorField({ language: CodeMirrorLanguage.Typescript }),
      },
    },
  },
  required: ['name'],
} as const
