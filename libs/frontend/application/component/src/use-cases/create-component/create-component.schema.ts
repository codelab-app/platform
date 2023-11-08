import type { ICreateComponentData } from '@codelab/frontend/abstract/domain'
import {
  idSchema,
  titleCaseValidation,
} from '@codelab/frontend/presentation/view'
import type { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<
  Omit<ICreateComponentData, 'rootElement'>
> = {
  properties: {
    ...idSchema(),
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
  },
  required: ['name', 'id'],
  title: 'Create Component Input',
  type: 'object',
}
