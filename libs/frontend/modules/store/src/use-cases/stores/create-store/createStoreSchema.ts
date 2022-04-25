import { SelectStore } from '@codelab/frontend/modules/type'
import { ICreateStoreDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createStoreSchema: JSONSchemaType<ICreateStoreDTO> = {
  title: 'Create Store',
  type: 'object',
  properties: {
    auth0Id: {
      type: 'string',
      format: 'hidden',
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    localState: {
      type: 'string',
      label: '',
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
  required: ['name', 'auth0Id'],
} as const
