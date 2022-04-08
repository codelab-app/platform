import { SelectStore } from '@codelab/frontend/modules/type'
import { ICreateAppDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createAppSchema: JSONSchemaType<ICreateAppDTO> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
    },
    storeId: {
      type: 'string',
      label: 'Mobx Store',
      uniforms: { component: SelectStore },
    },
  },
  required: ['name'],
} as const
