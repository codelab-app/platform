import { SelectStore } from '@codelab/frontend/modules/type'
import { JSONSchemaType } from 'ajv'

export type UpdateAppInput = {
  name: string
  storeId: string
}

export const updateAppSchema: JSONSchemaType<UpdateAppInput> = {
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
