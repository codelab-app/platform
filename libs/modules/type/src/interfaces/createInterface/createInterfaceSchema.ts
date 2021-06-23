import { CreateInterfaceInput } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const createInterfaceSchema: JSONSchemaType<CreateInterfaceInput> = {
  title: 'Create Interface Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
}
