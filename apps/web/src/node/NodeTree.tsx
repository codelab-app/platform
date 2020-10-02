import { DataNode, TreeProps } from 'antd/lib/tree'
import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'

export const nodeTreeData: NodeReactI = {
  type: 'React.Tree',
  props: {
    showLine: true,
    showIcon: true,
    selectable: true,
    draggable: true,
    onSelect: {
      __type: ['Eval'],
      value: 'return (selectedKeys,e)=>this.onselect(selectedKeys,e)',
    },
    onDrop: {
      __type: ['Eval'],
      value: 'return (dropDetails)=>this.ondrop(dropDetails)',
    },
    treeData: {
      __type: ['Eval'],
      value: 'return this.treedata?this.treedata:[]',
    },
  },
}

export type NodeTreeProps = {
  treedata: Array<DataNode>
  onselect: TreeProps['onSelect']
  ondrop: TreeProps['onDrop']
}
export const NodeTree = Renderer.components<NodeTreeProps>(nodeTreeData)
