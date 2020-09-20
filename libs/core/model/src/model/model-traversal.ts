import { ModelInterface } from './model.i'
import { NodeDtoModelI } from '@codelab/shared/interface/node'

export const modelWalker = (
  input: NodeDtoModelI,
  iteratee: (modelTree: ModelInterface, node: NodeDtoModelI) => ModelInterface,
) => (modelTree: ModelInterface, schemaNode: NodeDtoModelI) => {
  const newModelTree = iteratee({ ...modelTree }, schemaNode)

  return iteratee({ ...newModelTree }, input)
}
