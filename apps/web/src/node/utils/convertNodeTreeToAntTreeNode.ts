import { DataNode } from 'antd/lib/tree'
import { treeMap } from '@codelab/core/tree'
import { Mapper, NodeI } from '@codelab/shared/interface/node'

const mapper: Mapper<NodeI, DataNode> = (node) =>
  node === null
    ? undefined
    : {
        key: node.id,
        title: node.type,
      }

export const convertNodeTreeToAntTreeDataNode = treeMap<NodeI, DataNode>(mapper)
