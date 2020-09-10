import { curry } from 'ramda'
import { SchemaNode, ModelNode } from '@codelab/shared/interface/node'
import { ModelInterface } from './model.i'

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
