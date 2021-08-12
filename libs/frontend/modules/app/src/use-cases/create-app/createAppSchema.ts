import { CreateAppInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const createAppSchema: JSONSchemaType<CreateAppInput> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
