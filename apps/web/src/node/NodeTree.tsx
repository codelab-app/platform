import { DataNode, TreeProps } from 'antd/lib/tree'
import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'
import { NodeType } from '@codelab/shared/interface/node'

export const nodeTreeData: NodeReactI = {
  type: NodeType.React_Tree,
  props: {
    showLine: true,
    showIcon: true,
    draggable: true,
    onDrop: {
      __type: ['Eval'],
      value: 'return this.ondrop',
    },
    onSelect: {
      __type: ['Eval'],
      value:
        'return (values)=>{console.log("node. onSelect"); this.onselect(values)}',
    },
    treeData: {
      __type: ['Eval'],
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
