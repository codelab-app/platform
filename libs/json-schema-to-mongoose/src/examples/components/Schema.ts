import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import mongoose, { SchemaDefinition } from 'mongoose'
import { reduce } from 'lodash'
import { getSchemaType } from './SchemaFactory'

export class Schema {
  models: { [name: string]: mongoose.Model<any> } = {}

  constructor(private readonly jsonSchema: JSONSchema7) {}

  get mongooseModels(): any {
    const { definitions } = this.jsonSchema

    return reduce(
      definitions,
      (mongooseModels, definition, modelName) => {
        const model = mongoose.model(
          modelName,
          this.mongooseSchema((definition as JSONSchema7).properties),
        )

        return { ...mongooseModels, [modelName]: model }
      },
      {},
    )
  }

  private mongooseSchema(properties: JSONSchema7Definition): mongoose.Schema {
    let schemaDefinition: SchemaDefinition = {}

    for (const [schemaName, type] of Object.entries(properties)) {
      schemaDefinition = {
        ...schemaDefinition,
        [schemaName]: getSchemaType(type),
      }
    }

    return new mongoose.Schema(schemaDefinition)
  }
}
