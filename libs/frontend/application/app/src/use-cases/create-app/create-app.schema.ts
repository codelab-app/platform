import type { IAppCreateFormData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'

export const createAppSchema: JSONSchemaType<IAppCreateFormData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  errors: {
    name: {
      required: 'App name is required',
      minLength: 'App name must have at least 1 character',
      pattern: 'App name must be in title case with no extra spaces',
    },
  },
  required: ['name', 'id'],
  title: 'Create App Input',
  type: 'object',
} as const
