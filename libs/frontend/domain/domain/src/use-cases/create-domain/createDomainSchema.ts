import type { ICreateDomainDTO } from '@codelab/frontend/abstract/core'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

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
      autoFocus: true,
      format: 'hostname',
      ...nonEmptyString,
    },
    appId: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'appId'],
} as const
