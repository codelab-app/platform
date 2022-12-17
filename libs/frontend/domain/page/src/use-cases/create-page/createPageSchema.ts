import type { ICreatePageDTO } from '@codelab/frontend/abstract/core'
import { CodeMirrorField } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import { hideField } from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageDTO> = {
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
      type: 'string',
      autoFocus: true,
    },
    slug: {
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
