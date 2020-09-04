import * as mongoose from 'mongoose'
import { reduce } from 'lodash'
import { ModelNode, SchemaNode } from '@codelab/node'
import { modelWalker } from './model-traversal'
import { modelCreationIteratee } from './model-traversal-iteratee'
import { ModelInterface } from './model.i'

export class Model {
  static makeModel(input: ModelNode): mongoose.Model<any> {
    return reduce<SchemaNode, ModelInterface>(
      input.children ?? [],
      modelWalker(input, modelCreationIteratee),
      {},
    ).model
  }
}
