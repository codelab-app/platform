import { DataNode } from 'antd/lib/tree'
import { NodeI } from '@codelab/shared/interface/node'

export const convertNodeTreeToAntTreeDataNode = (node: NodeI): DataNode => {
  const treeData: DataNode = {
    key: node?.id || '',
    title: node.type,
  }

  if (node?.children?.length) {
    treeData.children = node.children.map((c) =>
      convertNodeTreeToAntTreeDataNode(c),
    )
  }

  return treeData
}
