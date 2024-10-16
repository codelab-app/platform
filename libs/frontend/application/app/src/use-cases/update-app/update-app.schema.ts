import type { IUpdateAppData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  nonEmptyString,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'

export const updateAppSchema: JSONSchemaType<IUpdateAppData> = {
  properties: {
    ...idSchema(),
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
  },
  required: ['name', 'id'],
  title: 'Edit App Input',
  type: 'object',
} as const
