import { ICreateFieldDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createFieldSchema: JSONSchemaType<ICreateFieldDTO> = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
    id: { type: 'string', disabled: true },
    key: { type: 'string', autoFocus: true },
    name: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    rules: {
      type: 'array',
      nullable: true,
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          // TODO: Accept types other than number based on the validation key
          value: { type: 'number' },
        },
        required: ['name', 'value'],
      },
    },
    /**
     * TODO: Refactor to match interface
     * Could somehow modify the form so we can accept an object of TypeRef, then the interface would match up better
     */
    fieldType: { type: 'string', nullable: true },
  },
  required: ['id', 'key', 'fieldType'],
}
