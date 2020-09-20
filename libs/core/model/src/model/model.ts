import { reduce } from 'lodash'
import * as mongoose from 'mongoose'
import { modelWalker } from './model-traversal'
import { modelCreationIteratee } from './model-traversal--iteratee'
import { ModelInterface } from './model.i'
import { NodeDtoModelI } from '@codelab/shared/interface/node'

export class Model {
  static makeModel(input: NodeDtoModelI): mongoose.Model<any> {
    const { model } = reduce<NodeDtoModelI, ModelInterface>(
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
