import type { IUpdatePageDTO } from '@codelab/frontend/abstract/core'
import {
  CodeMirrorField,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import type { JSONSchemaType } from 'ajv'

export const updatePageSchema: JSONSchemaType<
  Omit<IUpdatePageDTO, 'pageContainerElementId'>
> = {
  title: 'Update Page Input',
  type: 'object',
  properties: {
    appId: {
      type: 'string',
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
  required: ['name'],
} as const
