import type { ICreateAppDTO } from '@codelab/frontend/abstract/core'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
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
      ...titleCaseValidation,
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'auth0Id'],
} as const
