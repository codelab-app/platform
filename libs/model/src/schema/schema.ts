import { JSONSchema7 } from 'json-schema'
import * as mongoose from 'mongoose'

import { reduce } from 'lodash'
import { getSchemaType } from './schema-types'

export class Schema {
  private _schema: mongoose.Schema

  constructor(properties: JSONSchema7['properties']) {
    this._schema = this.registerMongooseSchema(properties)
    // const setup = R.compose(this.registerSchema)

    // Object.entries(properties).forEach(setup())
  }

  // private registerSchema = () => (property: [string, JSONSchema7]) => {
  //   const [field, type] = property
  //   const schemaDefinition: mongoose.SchemaDefinition = {
  //     [field]: getSchemaType(type),
  //   }

  //   this._schema = new mongoose.Schema(schemaDefinition)

  //   return property
  // }

  get mongooseSchema(): mongoose.Schema {
    return this._schema
  }

  private registerMongooseSchema(properties: JSONSchema7): mongoose.Schema {
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
}
