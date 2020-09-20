import * as mongoose from 'mongoose'
import { Schema } from '../schema'
import { ModelInterface } from './model.i'
import {
  NodeDtoModelI,
  isModelNode,
  isSchemaNode,
} from '@codelab/shared/interface/node'

export const modelCreationIteratee = (
  modelTree: ModelInterface,
  node: NodeDtoModelI<ModelInterface>,
): ModelInterface => {
  if (isSchemaNode(node)) {
    return { ...modelTree, schema: Schema.create(node) }
  }

  if (isModelNode(node)) {
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
