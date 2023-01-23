import type { IUpdatePageDTO } from '@codelab/frontend/abstract/core'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { nonEmptyString } from '@codelab/shared/utils'
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
      pattern: '^[a-z0-9 ]+$',
    },
    slug: {
      ...nonEmptyString,
      disabled: true,
      type: 'string',
    },
    getServerSideProps: {
      type: 'string',
      nullable: true,
      uniforms: {
        component: CodeMirrorField({ language: CodeMirrorLanguage.Typescript }),
      },
    },
  },
  required: ['name', 'slug'],
} as const
