import { SelectResourcesApi } from '@codelab/frontend/modules/type'
import { JSONSchemaType } from 'ajv'

export type CreateResourceInput = {
  name: string
  apiId: string
  data: string
}

export const createResourceSchema: JSONSchemaType<CreateResourceInput> = {
  title: 'Create Resource',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      autoFocus: true,
    },
    apiId: {
      type: 'string',
      uniforms: { component: SelectResourcesApi },
    },
    data: { type: 'string' },
  },
  required: ['name'],
} as const
