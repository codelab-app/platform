import {
  NodeA,
  NodeDtoTreeA,
  NodeDtoTreeI,
  NodeDtoTreeRefA,
  NodeDtoTreeRefI,
  NodeI,
} from '../dto'
import { NodeType } from '../enums'

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
