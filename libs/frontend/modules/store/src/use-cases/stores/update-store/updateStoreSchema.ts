import { SelectStore } from '@codelab/frontend/modules/type'
import { monacoFieldFactory } from '@codelab/frontend/view/components'
import { IUpdateStoreDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updateStoreSchema: JSONSchemaType<IUpdateStoreDTO> = {
  title: 'Update Store Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    state: {
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
