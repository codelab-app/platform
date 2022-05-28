import { SelectStore } from '@codelab/frontend/modules/type'
import { ICreateStoreDTO } from '@codelab/shared/abstract/core'
import { hideField, showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const createStoreSchema: JSONSchemaType<ICreateStoreDTO> = {
  title: 'Create Store',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
    state: {
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
