import { JSONSchema7 } from 'json-schema'
import mongoose, { SchemaDefinition } from 'mongoose'
import { reduce } from 'lodash'

import { getSchemaType } from './JsonSchema-types'

export class JsonSchema {
  models: { [name: string]: mongoose.Model<any> } = {}

  private readonly jsonSchema

  constructor(jsonSchema?: JSONSchema7) {
    this.jsonSchema = jsonSchema
  }

  get mongooseModels(): any {
    const { definitions } = this.jsonSchema

    return reduce(
      definitions,
      (mongooseModels, definition, modelName) => {
        const schema = this.mongooseSchema(
          (definition as JSONSchema7).properties,
        )
        const model = mongoose.model(modelName, schema)

        return { ...mongooseModels, [modelName]: model }
      },
      {},
    )
  }

  private mongooseSchema(properties: JSONSchema7): mongoose.Schema {
    const schemaDefinition: SchemaDefinition = reduce<
      JSONSchema7,
      SchemaDefinition
    >(
      properties,
      (
        mongooseSchemaDefinition: SchemaDefinition,
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
}
