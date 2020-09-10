import * as mongoose from 'mongoose'
import { SchemaNode } from '@codelab/shared/interface/node'
import { produceSchemaDefinition } from './schema-types'

export class Schema {
  static create(schemaNode: SchemaNode) {
    const { props } = schemaNode
    const schemaDefinition = produceSchemaDefinition(props)

    return new mongoose.Schema(schemaDefinition)
  }
}
