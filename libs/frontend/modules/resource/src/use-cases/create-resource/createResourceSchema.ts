import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import {
  ICreateResourceDTO,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'
import { keys } from 'lodash'

const monacoFieldJson = monacoFieldFactory({
  editorOptions: { language: MonacoLanguage.json },
  containerProps: { style: { height: '240px' } },
})

export const createResourceSchema: JSONSchemaType<ICreateResourceDTO> = {
  title: 'Create Resource',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    type: {
      type: 'string',
      enum: keys(IResourceType) as Array<IResourceType>,
      showSearch: true,
    },
    config: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        headers: { type: 'string', uniforms: { component: monacoFieldJson } },
        cookies: { type: 'string', uniforms: { component: monacoFieldJson } },
      },
      label: '',
      required: ['url'],
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'type'],
} as const
