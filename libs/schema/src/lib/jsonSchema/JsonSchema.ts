import { JSONSchema7 } from 'json-schema'
import * as mongoose from 'mongoose'
import { reduce } from 'lodash'

import { getSchemaType } from './JsonSchema-types'

export type MongooseModels = {
  [model: string]: mongoose.Model<any>
}

function mongooseSchema(properties: JSONSchema7): mongoose.Schema {
  const schemaDefinition: mongoose.SchemaDefinition = reduce<
    JSONSchema7,
    mongoose.SchemaDefinition
  >(
    properties,
    (
      mongooseSchemaDefinition: mongoose.SchemaDefinition,
      type: JSONSchema7,
      schemaName,
    ) => {
      return {
        ...mongooseSchemaDefinition,
        [schemaName]: getSchemaType(type),
      }
    },
    {},
  )

  return new mongoose.Schema(schemaDefinition)
}

export function mongooseModels(jsonSchema: JSONSchema7): MongooseModels {
  const { definitions } = jsonSchema

  return reduce(
    definitions,
    (models, definition, modelName) => {
      const schema = mongooseSchema((definition as JSONSchema7).properties)
      const model = mongoose.model(modelName, schema)

      return { ...models, [modelName]: model }
    },
    {},
  )
}
