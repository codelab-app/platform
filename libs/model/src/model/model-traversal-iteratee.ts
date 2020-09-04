import * as mongoose from 'mongoose'
import { SchemaNode, Schema } from '../schema'
import { ModelNode, ModelInterface } from './model-interface'

export function modelCreationIteratee(
  modelTree: ModelInterface,
  node: SchemaNode | ModelNode,
): ModelInterface {
  if (node.nodeType === 'Schema') {
    return { ...modelTree, schema: Schema.create(node) }
  }

  if (node.nodeType === 'Model') {
    if (!modelTree.schema) {
      throw new Error('Missing schema as children')
    }

    return {
      ...modelTree,
      model: mongoose.model(node.props.name, modelTree.schema),
    }
  }

  return { ...modelTree }
}
