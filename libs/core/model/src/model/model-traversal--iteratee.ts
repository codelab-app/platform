import * as mongoose from 'mongoose'
import { NodeDtoI } from '../../../../shared/interface/node/src/dto/node-dto'
import { Schema } from '../schema'
import { ModelInterface } from './model.i'
import { NodeTypeEnum } from '@codelab/shared/interface/node'

export const modelCreationIteratee = (
  modelTree: ModelInterface,
  node: NodeDtoI<ModelInterface>,
): ModelInterface => {
  if (node.type === NodeTypeEnum.Schema) {
    return { ...modelTree, schema: Schema.create(node) }
  }

  if (node.type === NodeTypeEnum.Model) {
    if (!modelTree.schema) {
      throw new Error('Missing schema as children')
    }

    return {
      ...modelTree,
      model: mongoose.model(node?.props?.name || '', modelTree.schema),
    }
  }

  return { ...modelTree }
}
