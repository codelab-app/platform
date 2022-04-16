import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { ICreateResourceDTO, ResourceType } from '@codelab/shared/abstract/core'
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
      enum: keys(ResourceType) as Array<ResourceType>,
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
  },
  required: ['name', 'type'],
} as const
