import { ModelNode, SchemaNode, NodeTypeEnum } from '@codelab/node'
import * as mongoose from 'mongoose'
import { Schema } from '../schema'
import { ModelInterface } from './model.i'

export function modelCreationIteratee(
  modelTree: ModelInterface,
  node: SchemaNode | ModelNode,
): ModelInterface {
  if (node.nodeType === NodeTypeEnum.Schema) {
    return { ...modelTree, schema: Schema.create(node) }
  }

  if (node.nodeType === NodeTypeEnum.Model) {
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
