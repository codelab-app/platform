import * as mongoose from 'mongoose'

export type SchemaTypeName = 'string' | 'number' | 'boolean'

export interface SchemaTypeOpts
  extends Omit<mongoose.SchemaTypeOpts<any>, 'type'> {
  type: SchemaTypeName
}

export interface SchemaDefinition {
  [path: string]: SchemaTypeOpts
}

export interface SchemaNode {
  nodeType: 'Schema'
  props: SchemaDefinition
}
