import type { ICreatePageDTO } from '@codelab/frontend/abstract/core'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { hideField, nonEmptyString } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<
  Omit<ICreatePageDTO, 'pageContainerElementId'>
> = {
  title: 'Create Page Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    auth0Id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    rootElementId: {
      type: 'string',
      nullable: true,
      ...hideField,
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
    appId: {
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
