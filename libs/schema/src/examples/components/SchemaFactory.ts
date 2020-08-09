import mongoose, { SchemaType, SchemaTypeOpts } from 'mongoose'
import { JSONSchema7Type, JSONSchema7Object } from 'json-schema'

const isEnum = (type: JSONSchema7Type): type is JSONSchema7Object => {
  if (
    'enum' in (type as JSONSchema7Object) &&
    Array.isArray((type as JSONSchema7Object).enum)
  ) {
    return true
  }

  return false
}

export function getSchemaType(
  type: JSONSchema7Type,
): SchemaTypeOpts<any> | mongoose.Schema | SchemaType {
  if (type === 'string') {
    return { type: mongoose.Schema.Types.String }
  }

  if (isEnum(type)) {
    return { type: mongoose.Schema.Types.String, enum: type.enum }
  }

  if (type === 'number') {
    return { type: mongoose.Schema.Types.Number }
  }

  if (type === 'integer') {
    return { type: mongoose.Schema.Types.Number }
  }

  if (type === 'boolean') {
    return { type: mongoose.Schema.Types.Boolean }
  }

  if (type === 'object') {
    return { type: mongoose.Schema.Types.ObjectId }
  }

  if (type === 'array') {
    return { type: mongoose.Schema.Types.Array }
  }

  return { type: mongoose.Schema.Types.String }
}
