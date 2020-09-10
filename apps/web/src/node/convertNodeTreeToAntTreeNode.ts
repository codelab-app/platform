import { DataNode } from 'antd/lib/tree'

import { Node } from '@codelab/core/node'

export const convertNodeTreeToAntTreeDataNode = (node: Node): DataNode => {
  const treeData: DataNode = {
    key: node.id,
    title: node.nodeType,
  }

  if (node.hasChildren()) {
    treeData.children = node.children.map((c) =>
      convertNodeTreeToAntTreeDataNode(c),
    )
  }

  return treeData
}
