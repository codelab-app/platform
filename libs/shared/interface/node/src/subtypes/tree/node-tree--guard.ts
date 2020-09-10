import { TreeNodeI } from './node-tree'
import { NodeI } from '../../node--codec'
import { NodeTypeEnum } from '../../node--enum'

export const isTreeNode = (node: NodeI): node is TreeNodeI => {
  return node?.nodeType === NodeTypeEnum.Tree
}
