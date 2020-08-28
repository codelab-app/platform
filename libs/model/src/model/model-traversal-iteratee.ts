import * as mongoose from 'mongoose'
import { SchemaNode, Schema } from '../schema'

export function schemaCreationIteratee(
  schemaNode: SchemaNode,
): mongoose.Schema {
  return Schema.create(schemaNode)
}
