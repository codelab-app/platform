import { JSONSchemaType } from 'ajv'
import { CreateFieldMutationVariables } from '../field.endpoints.graphql.gen'

export type CreateFieldSchema = Pick<
  CreateFieldMutationVariables['input'],
  'key' | 'name' | 'description'
> & {
  typeId: 'string'
}

export const createFieldSchema: JSONSchemaType<CreateFieldSchema> = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
    key: { type: 'string' },
    name: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    typeId: { type: 'string' },
  },
  required: ['key', 'typeId'],
}
