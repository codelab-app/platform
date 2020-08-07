import { JSONSchema7Definition, JSONSchema7 } from 'json-schema'
import mongoose, { SchemaType } from 'mongoose'

export function getSchemaType(
  propertyDefinition: JSONSchema7Definition,
): typeof SchemaType {
  const { type } = propertyDefinition as JSONSchema7

  switch (type) {
    case 'string':
      return mongoose.Schema.Types.String
    case 'number':
      return mongoose.Schema.Types.Number
    case 'integer':
      return mongoose.Schema.Types.Number
    case 'boolean':
      return mongoose.Schema.Types.Boolean
    case 'object':
      return mongoose.Schema.Types.ObjectId
    case 'array':
      return mongoose.Schema.Types.Array
    case 'null':
      return mongoose.Schema.Types.Boolean
    default:
      return mongoose.Schema.Types.String
  }
}
