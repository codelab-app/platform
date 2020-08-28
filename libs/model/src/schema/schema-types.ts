import * as mongoose from 'mongoose'
import { reduce } from 'lodash'
import { SchemaTypeOpts, SchemaDefinition } from './schema-interface'

export function getSchemaType(
  property: SchemaTypeOpts,
): mongoose.SchemaTypeOpts<any> {
  const { type } = property

  if ('enum' in property) {
    return { type: mongoose.Schema.Types.String, enum: property.enum }
  }

  if ('ref' in property) {
    return { type: mongoose.Schema.Types.ObjectId, ref: property.ref }
  }

  if (type === 'string') {
    return { type: mongoose.Schema.Types.String }
  }

  if (type === 'number') {
    return { type: mongoose.Schema.Types.Number }
  }

  if (type === 'boolean') {
    return { type: mongoose.Schema.Types.Boolean }
  }

  return { type: mongoose.Schema.Types.String }
}

export function produceSchemaDefinition(
  props: SchemaDefinition,
): mongoose.SchemaDefinition {
  const schemaDefinition: mongoose.SchemaDefinition = reduce<
    SchemaDefinition,
    mongoose.SchemaDefinition
  >(
    props,
    (
      mongooseSchemaDefinition: mongoose.SchemaDefinition,
      propValue: SchemaDefinition[keyof SchemaDefinition],
      propKey: keyof SchemaDefinition,
    ) => {
      return {
        ...mongooseSchemaDefinition,
        [propKey]: getSchemaType(propValue),
      }
    },
    {},
  )

  return schemaDefinition
}
