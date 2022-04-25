import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { MonacoLanguage } from '@codelab/shared/abstract/codegen'
import { ICreateActionDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createActionSchema: JSONSchemaType<ICreateActionDTO> = {
  title: 'Create Action',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    body: {
      type: 'string',
      uniforms: {
        component: monacoFieldFactory({
          editorOptions: { language: MonacoLanguage.typescript },
          containerProps: { style: { height: '240px' } },
        }),
      },
    },
  },
  required: ['name', 'body'],
} as const
