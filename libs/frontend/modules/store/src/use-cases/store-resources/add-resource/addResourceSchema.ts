import { SelectResources } from '@codelab/frontend/modules/type'
import { IAddStoreResourceDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const addResourceSchema: JSONSchemaType<IAddStoreResourceDTO> = {
  title: 'Create Action',
  type: 'object',
  properties: {
    key: {
      type: 'string',
      autoFocus: true,
    },
    resourceId: {
      type: 'string',
      label: 'Resource',
      uniforms: { component: SelectResources },
    },
  },
  required: ['key', 'resourceId'],
} as const
