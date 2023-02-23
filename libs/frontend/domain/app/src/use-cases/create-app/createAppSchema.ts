import type { ICreateAppDTO } from '@codelab/frontend/abstract/core'
import {
  hideField,
  nonEmptyString,
  showFieldOnDev,
  singlySpacedTitleCaseWithNumbersRegex,
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
      pattern: singlySpacedTitleCaseWithNumbersRegex.source,
      errorMessage: 'must be in Title Case',
    },
    auth0Id: {
      type: 'string',
      disabled: true,
      ...showFieldOnDev(),
    },
  },
  required: ['name', 'auth0Id'],
} as const
