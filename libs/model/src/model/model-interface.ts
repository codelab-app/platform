import * as mongoose from 'mongoose'
import { SchemaNode } from '../schema'

export interface ModelProps {
  name: string
}

export interface ModelNode {
  nodeType: 'Model'
  props: ModelProps
  children: Array<SchemaNode>
}

export interface ModelInterface {
  schema?: mongoose.Schema
  model?: mongoose.Model<any>
}
