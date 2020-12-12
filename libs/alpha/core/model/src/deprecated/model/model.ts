import { JSONSchema7 } from 'json-schema'
import { reduce } from 'lodash'
import * as mongoose from 'mongoose'
import { Schema } from '../json-schema'

export type JsonModels = Map<string, JsonModel>

export class JsonModel {
  public readonly name: string

  private readonly _model: mongoose.Model<any>

  private readonly _schema: Schema

  constructor(name: string, schema: Schema) {
    this.name = name
    this._schema = schema
    this._model = mongoose.model(name, schema.mongooseSchema)
  }

  get schema(): mongoose.Schema {
    return this._schema.mongooseSchema
  }

  // TODO: test that empty jsonSchema returns empty map
  static parse(jsonSchema: JSONSchema7): JsonModels {
    if (!jsonSchema || !('definitions' in jsonSchema)) {
      return new Map()
    }

    const { definitions } = jsonSchema

    const models = reduce(
      definitions,
      (modelsAcc, definition, name) => {
        const schema = new Schema((definition as JSONSchema7).properties)
        const model = new JsonModel(name, schema)

        return { ...modelsAcc, [name]: model }
      },
      {},
    )

    return new Map(Object.entries(models))
  }
}
