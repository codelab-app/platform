import { DataNode, TreeProps } from 'antd/lib/tree'
import { Renderer } from '@codelab/alpha/core/renderer'
import type { NodeReactI } from '@codelab/alpha/shared/interface/node'
import { NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const nodeTreeData: NodeReactI = {
  type: NodeType.React_Tree,
  props: {
    showLine: true,
    showIcon: true,
    draggable: true,
    onDrop: {
      __type: [PropType.Eval],
      value: 'return this.ondrop',
    },
    onSelect: {
      __type: [PropType.Eval],
      value:
        'return (values)=>{console.log("node. onSelect"); this.onselect(values)}',
    },
    treeData: {
      __type: [PropType.Eval],
      value: 'return this.treedata? this.treedata: []',
    },
  },
}

export type NodeTreeProps = {
  treedata: Array<DataNode>
  onselect: TreeProps['onSelect']
  ondrop: TreeProps['onDrop']
}

export const NodeTree = Renderer.components<NodeTreeProps>(nodeTreeData)
