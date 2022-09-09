import { EventDataNode } from 'antd/lib/tree'
import { Key } from 'rc-tree/lib/interface'

interface DropInfo {
  node: EventDataNode<unknown>
  dragNode: EventDataNode<unknown>
  dragNodesKeys: Array<Key>
  dropPosition: number
  dropToGap: boolean
}

export const shouldMoveElementAsNextSibling = (info: DropInfo) => {
  const isRootNode = info.node.pos === '0-0'

  // next sibling shouldn't be root node
  return info.dropToGap && !isRootNode
}

export const shouldMoveElementAsFirstChild = (info: DropInfo) => !info.dropToGap
