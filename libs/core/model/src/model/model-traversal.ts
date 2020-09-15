import { curry } from 'ramda'
import { ModelInterface } from './model.i'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const modelWalker = (
  input: NodeDtoI,
  iteratee: (modelTree: ModelInterface, node: NodeDtoI) => ModelInterface,
) => (modelTree: ModelInterface, schemaNode: NodeDtoI) => {
  const newModelTree = iteratee({ ...modelTree }, schemaNode)

  return iteratee({ ...newModelTree }, input)
}
