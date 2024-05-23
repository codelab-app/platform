import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-view/components'
import type { IUpdateComponentData } from '@codelab/shared/abstract/core'
import type { JSONSchemaType } from 'ajv'

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
