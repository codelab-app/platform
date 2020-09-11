import * as mongoose from 'mongoose'

export interface ModelInterface {
  name?: string
  schema?: mongoose.Schema
  model?: mongoose.Model<any>
}
