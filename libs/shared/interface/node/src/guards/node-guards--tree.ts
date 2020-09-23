import { TreeType } from '../enums/node-enum--tree'
import {
  NodeA,
  NodeDtoTreeA,
  NodeDtoTreeI,
  NodeDtoTreeRefA,
  NodeDtoTreeRefI,
  NodeI,
} from '@codelab/shared/interface/node'

export const isTreeNode = (
  node: NodeI | NodeA,
): node is NodeDtoTreeI | NodeDtoTreeA => {
  return node?.type === TreeType.Tree
}

export const isRefNode = (
  node: NodeI | NodeA,
): node is NodeDtoTreeRefI | NodeDtoTreeRefA => {
  return node?.type === TreeType.Ref
}
