import { DataNode } from 'antd/lib/tree'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const convertNodeTreeToAntTreeDataNode = (node: NodeDtoI): DataNode => {
  const treeData: DataNode = {
    key: node.id,
    title: node.type,
  }

  if (node.children.length) {
    treeData.children = node.children.map((c) =>
      convertNodeTreeToAntTreeDataNode(c),
    )
  }

  return treeData
}
