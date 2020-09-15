import { reduce } from 'lodash'
import * as mongoose from 'mongoose'
import { modelWalker } from './model-traversal'
import { modelCreationIteratee } from './model-traversal--iteratee'
import { ModelInterface } from './model.i'
import { NodeDtoI } from '@codelab/shared/interface/node'

export class Model {
  static makeModel(input: NodeDtoI): mongoose.Model<any> {
    const { model } = reduce<NodeDtoI, ModelInterface>(
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
