import type { ICreatePageDTO } from '@codelab/frontend/abstract/core'
import { idSchema, ownerSchema } from '@codelab/frontend/shared/domain'
import {
  hideField,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/shared/utils'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export type CreatePageSchema = Omit<
  ICreatePageDTO,
  'pageContainerElementId' | 'descendentElements'
>

export const createPageSchema: JSONSchemaType<CreatePageSchema> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    ...idSchema,
    ...ownerSchema,
    rootElement: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          ...hideField,
        },
      },
      required: ['id'],
    },
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
