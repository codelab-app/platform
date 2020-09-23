import { DataNode } from 'antd/lib/tree'
import { Mapper, NodeI } from '@codelab/shared/interface/node'
import { treeMap } from '@codelab/core/tree'

const mapper: Mapper<NodeI, DataNode> = (node) => ({
  key: node.id,
  title: node.type,
})

export const convertNodeTreeToAntTreeDataNode = treeMap<NodeI, DataNode>(mapper)
