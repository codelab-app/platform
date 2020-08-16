import * as mongoose from 'mongoose'
import { JSONSchema7 } from 'json-schema'
import { reduce } from 'lodash'
import { Schema } from '../schema'

type MongooseModels = {
  [modelName: string]: mongoose.Model<any>
}

export type Models = Map<string, Model>

export class Model {
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

  static parse(jsonSchema: JSONSchema7): Models {
    const { definitions } = jsonSchema

    const models = reduce(
      definitions,
      (modelsAcc, definition, name) => {
        const schema = new Schema((definition as JSONSchema7).properties)
        const model = new Model(name, schema)

        return { ...modelsAcc, [name]: model }
      },
      {},
    )

    return new Map(Object.entries(models))
  }
}
