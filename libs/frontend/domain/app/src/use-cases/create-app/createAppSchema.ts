import type { ICreateAppDTO } from '@codelab/frontend/abstract/core'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
} from '@codelab/shared/utils'
import type { JSONSchemaType } from 'ajv'

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
      autoFocus: true,
      ...nonEmptyString,
      pattern: '^[a-z0-9 ]+$',
    },
    slug: {
      ...nonEmptyString,
      disabled: true,
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'auth0Id', 'slug'],
} as const
