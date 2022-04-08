import { SelectStore } from '@codelab/frontend/modules/type'
import { IUpdateAppDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const updateAppSchema: JSONSchemaType<IUpdateAppDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    storeId: {
      type: 'string',
      label: 'Mobx Store',
      uniforms: { component: SelectStore },
    },
  },
  required: ['name'],
} as const
