import * as mongoose from 'mongoose'
import { produceSchemaDefinition } from './schema-types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export class Schema {
  static create(schemaNode: NodeDtoI) {
    const { props } = schemaNode
    const schemaDefinition = produceSchemaDefinition(props)

    return new mongoose.Schema(schemaDefinition)
  }
}
