import { IUpdateDomainDTO } from '@codelab/frontend/abstract/core'
import { hideField, showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const updateDomainSchema: JSONSchemaType<IUpdateDomainDTO> = {
  title: 'Edit App Input',
  type: 'object',
  properties: {
    appId: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
    id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    name: {
      type: 'string',
      autoFocus: true,
    },
  },
  required: ['name', 'appId', 'id'],
} as const
