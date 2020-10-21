import {
  NodeA,
  NodeDtoTreeA,
  NodeDtoTreeI,
  NodeDtoTreeRefA,
  NodeDtoTreeRefI,
  NodeI,
  NodeType,
} from '@codelab/shared/interface/node'

export const isTreeNode = (
  node: NodeI | NodeA,
): node is NodeDtoTreeI | NodeDtoTreeA => {
  return node?.type === NodeType.Tree
}

export const isRefNode = (
  node: NodeI | NodeA,
): node is NodeDtoTreeRefI | NodeDtoTreeRefA => {
  return node?.type === NodeType.Ref
}
