import type { IUpdateDomainDTO } from '@codelab/frontend/abstract/core'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

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
      autoFocus: true,
      ...nonEmptyString,
    },
  },
  required: ['name', 'appId', 'id'],
} as const
