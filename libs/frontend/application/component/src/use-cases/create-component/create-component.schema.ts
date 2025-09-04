import type { ICreateComponentData } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import {
  idSchema,
  refSchema,
  titleCaseValidation,
} from '@codelab/frontend-presentation-components-form/schema'

export const createComponentSchema: JSONSchemaType<
  Omit<ICreateComponentData, 'rootElement'>
> = {
  properties: {
    ...idSchema,
    ...refSchema('owner', 'Owner'),
    name: {
      type: 'string',
      autoFocus: true,
      ...titleCaseValidation,
    },
  },
  required: ['name', 'id', 'owner'],
  title: 'Create Component Input',
  type: 'object',
}
