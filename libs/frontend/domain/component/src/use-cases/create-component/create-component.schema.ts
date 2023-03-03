import type { ICreateComponentData } from '@codelab/frontend/abstract/core'
import {
  idSchema,
  ownerSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<ICreateComponentData> = {
  properties: {
    ...idSchema,
    ...ownerSchema,
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
  },
  required: ['name', 'owner', 'id'],
  title: 'Create Component Input',
  type: 'object',
}
