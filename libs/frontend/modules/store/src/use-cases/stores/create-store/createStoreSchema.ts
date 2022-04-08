import { SelectStore } from '@codelab/frontend/modules/type'
import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { JSONSchemaType } from 'ajv'

export type CreateStoreInput = {
  name: string
  parentStore: { id: string; key: string }
  initialState: string
}

export const createStoreSchema: JSONSchemaType<CreateStoreInput> = {
  title: 'Create Store',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    initialState: {
      type: 'string',
      label: '',
      component: monacoFieldFactory({
        editorOptions: { language: 'json' },
        containerProps: { style: { height: '240px' } },
      }),
    },
    parentStore: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          label: 'Parent Store',
          uniforms: { component: SelectStore },
        },
        key: {
          label: 'Store Key',
          type: 'string',
        },
      },
      required: ['key'],
    },
  },
  required: ['name'],
} as const
