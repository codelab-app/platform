import * as mongoose from 'mongoose'
import { curry } from 'ramda'
import { SchemaNode } from '../schema'
import { ModelInterface } from './model-interface'

export const modelWalker = curry(
  (
    iteratee: (schemaNode: SchemaNode) => mongoose.Schema,
    initialModel: ModelInterface,
    schemaNode: SchemaNode,
  ) => {
    const schema = iteratee(schemaNode)
    const model = mongoose.model(initialModel.name, schema)

    return { ...initialModel, schema, model }
  },
)
