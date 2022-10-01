import { ICreateDomainDTO } from '@codelab/shared/abstract/core'
import { hideField, showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const createDomainSchema: JSONSchemaType<ICreateDomainDTO> = {
  title: 'Create Domain Input',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      nullable: true,
      ...hideField,
    },
    name: {
      type: 'string',
      autoFocus: true,
      format: 'hostname',
    },
    appId: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'appId'],
} as const
