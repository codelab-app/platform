import mongoose, { SchemaType } from 'mongoose'
import { JSONSchema7Type } from 'json-schema'

export function getSchemaType(type: JSONSchema7Type): typeof SchemaType {
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
