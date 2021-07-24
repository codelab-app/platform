import { CreateElementInput } from '@codelab/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<CreateElementInput> = {
  title: 'Create Page Element Input',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    atomId: {
      type: 'string',
      nullable: true,
    },
    parentElementId: {
      type: 'string',
      nullable: true,
    },
    order: {
      type: 'integer',
      nullable: true,
    },
  },
  required: ['name'],
}
