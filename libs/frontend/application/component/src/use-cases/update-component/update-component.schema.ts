import type { IUpdateComponentData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'

export const updateComponentSchema: JSONSchemaType<IUpdateComponentData> = {
  properties: {
    ...idSchema(),
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
  },
  required: ['name'],
  title: 'Update Component Input',
  type: 'object',
}
