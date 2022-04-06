import { JSONSchemaType } from 'ajv'

export type CreateFieldData = {
  key: string
  name: string | null
  description?: string | null
  existingTypeId: string
}

export const createFieldSchema: JSONSchemaType<CreateFieldData> = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
    key: { type: 'string', autoFocus: true },
    name: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    /**
     * TODO: Refactor to match interface
     * Could somehow modify the form so we can accept an object of TypeRef, then the interface would match up better
     */
    existingTypeId: { type: 'string', nullable: true },
  },
  required: ['key', 'existingTypeId'],
}
