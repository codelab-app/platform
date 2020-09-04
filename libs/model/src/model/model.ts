import * as mongoose from 'mongoose'
import { reduce } from 'lodash'
import { modelWalker } from './model-traversal'
import { ModelNode, ModelInterface } from './model-interface'
import { modelCreationIteratee } from './model-traversal-iteratee'
import { SchemaNode } from '../schema'

export class Model {
  static makeModel(input: ModelNode): mongoose.Model<any> {
    return reduce<SchemaNode, ModelInterface>(
      input.children ?? [],
      modelWalker(input, modelCreationIteratee),
      {},
    ).model
  }
}
