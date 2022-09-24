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
    generalValidationRules: {
      type: 'object',
      nullable: true,
      properties: {
        nullable: { type: 'boolean', nullable: true },
      },
    },
    stringValidationRules: {
      type: 'object',
      nullable: true,
      properties: {
        minLength: { type: 'integer', nullable: true, minimum: 0 },
        maxLength: { type: 'integer', nullable: true, minimum: 0 },
        pattern: { type: 'string', nullable: true },
      },
    },
    integerValidationRules: {
      type: 'object',
      nullable: true,
      properties: {
        maximum: { type: 'integer', nullable: true },
        minimum: { type: 'integer', nullable: true },
        exclusiveMaximum: { type: 'integer', nullable: true },
        exclusiveMinimum: { type: 'integer', nullable: true },
        multipleOf: { type: 'integer', nullable: true },
      },
    },
    floatValidationRules: {
      type: 'object',
      nullable: true,
      properties: {
        maximum: { type: 'number', nullable: true },
        minimum: { type: 'number', nullable: true },
        exclusiveMaximum: { type: 'number', nullable: true },
        exclusiveMinimum: { type: 'number', nullable: true },
        multipleOf: { type: 'number', nullable: true },
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
