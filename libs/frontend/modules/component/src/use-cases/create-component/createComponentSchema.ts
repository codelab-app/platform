import { ICreateComponentDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<ICreateComponentDTO> = {
  title: 'Create Component Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
    },
  },
  required: ['name'],
}
