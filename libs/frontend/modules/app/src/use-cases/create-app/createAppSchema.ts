import { CreateAppInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const createAppSchema: JSONSchemaType<CreateAppInput> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
    },
  },
  required: ['name'],
}
