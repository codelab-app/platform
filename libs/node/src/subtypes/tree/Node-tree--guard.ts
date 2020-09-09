import { NodeI, NodeTypeEnum } from '../../codec'
import { TreeNodeI } from './Node-tree'

export const isTreeNode = (node: NodeI): node is TreeNodeI => {
  return node?.nodeType === NodeTypeEnum.Tree
}
