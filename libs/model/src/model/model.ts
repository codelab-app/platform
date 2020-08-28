import * as mongoose from 'mongoose'
import { reduce } from 'lodash'
import { modelWalker } from './model-traversal'
import { ModelNode, ModelInterface } from './model-interface'
import { schemaCreationIteratee } from './model-traversal-iteratee'
import { SchemaNode } from '../schema'

export class Model {
  static makeModel(input: ModelNode): mongoose.Model<any> {
    const model: ModelInterface = {
      name: input.props.name,
    }

    return reduce<SchemaNode, ModelInterface>(
      input?.children ?? [],
      modelWalker(schemaCreationIteratee),
      model,
    ).model
  }
}
