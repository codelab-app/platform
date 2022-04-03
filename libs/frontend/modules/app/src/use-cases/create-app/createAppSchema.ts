import { SelectStore } from '@codelab/frontend/modules/type'
import { JSONSchemaType } from 'ajv'

export type CreateAppInput = {
  name: string
  storeId: string
}

export const createAppSchema: JSONSchemaType<CreateAppInput> = {
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
