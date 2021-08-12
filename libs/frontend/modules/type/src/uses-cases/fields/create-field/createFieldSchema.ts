import { CreateFieldInput } from '@codelab/shared/codegen/graphql'
import { JSONSchemaType } from 'ajv'

export type CreateFieldSchemaObject = Pick<
  CreateFieldInput,
  'key' | 'name' | 'description'
> & {
  typeId: 'string'
}

export const createFieldSchema: JSONSchemaType<CreateFieldSchemaObject> = {
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
