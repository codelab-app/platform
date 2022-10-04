import { ICreateAppDTO } from '@codelab/frontend/abstract/core'
import { hideField, showFieldOnDev } from '@codelab/shared/utils'
import { JSONSchemaType } from 'ajv'

export const createAppSchema: JSONSchemaType<ICreateAppDTO> = {
  title: 'Create App Input',
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
    },
    slug: {
      type: 'string',
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'auth0Id', 'slug'],
} as const
