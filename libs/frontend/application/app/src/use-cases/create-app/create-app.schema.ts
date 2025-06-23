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
  required: ['name'],
  title: 'Create App Input',
  type: 'object',
} as const
