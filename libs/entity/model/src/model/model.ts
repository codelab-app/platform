import * as mongoose from 'mongoose'
import { reduce } from 'lodash'
import { ModelNode, SchemaNode } from '@codelab/shared/interface/node'
import { modelWalker } from './model-traversal'
import { modelCreationIteratee } from './model-traversal--iteratee'
import { ModelInterface } from './model.i'

export class Model {
  static makeModel(input: ModelNode): mongoose.Model<any> {
    const { model } = reduce<SchemaNode, ModelInterface>(
      input.children ?? [],
      modelWalker(input, modelCreationIteratee),
      {},
    )

    if (model === undefined) {
      throw new Error('Model.makeModel failed to create model')
    }

    return model
  }
}
