import { curry } from 'ramda'
import { reduce } from 'lodash'
import { ModelInterface, ModelNode } from './model-interface'
import { SchemaNode } from '../schema'

export const modelWalker = curry(
  (
    input: ModelNode,
    iteratee: (
      modelTree: ModelInterface,
      node: SchemaNode | ModelNode,
    ) => ModelInterface,
    modelTree: ModelInterface,
    schemaNode: SchemaNode,
  ) => {
    const newModelTree = iteratee({ ...modelTree }, schemaNode)

    return iteratee({ ...newModelTree }, input)
  },
)
