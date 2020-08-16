import * as mongoose from 'mongoose'
import { JSONSchema7Object, JSONSchema7 } from 'json-schema'

export enum SchemaType {
  String = 'String',
  Number = 'Number',
}

export const isEnum = (
  property: JSONSchema7,
): property is JSONSchema7Object => {
  if (
    'enum' in (property as JSONSchema7Object) &&
    Array.isArray((property as JSONSchema7Object).enum)
  ) {
    return true
  }

  return false
}

export const isRef = (property: JSONSchema7): property is JSONSchema7Object => {
  return typeof (property?.items as JSONSchema7)?.$ref === 'string'
}

export const getRef = (property: JSONSchema7): string => {
  const { $ref } = property.items as JSONSchema7
  const ref = $ref.split('/')

  return ref[ref.length - 1]
}

interface SchemaTypeFactory<SchemaI, SchemaO> {
  (schemaType: SchemaI): SchemaO
}

export function getSchemaType(
  property: JSONSchema7,
): mongoose.SchemaTypeOpts<any> | mongoose.Schema | mongoose.SchemaType {
  const { type } = property

  if (type === 'string') {
    return { type: mongoose.Schema.Types.String }
  }

  if (isEnum(property)) {
    return { type: mongoose.Schema.Types.String, enum: property.enum }
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
    return isRef(property)
      ? [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: getRef(property),
          },
        ]
      : {
          type: mongoose.Schema.Types.Array,
        }
  }

  return { type: mongoose.Schema.Types.String }
}
