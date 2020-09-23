import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'
import { DataNode, TreeProps } from 'antd/lib/tree'

export const nodeTreeData: NodeReactI = {
  type: 'React.Tree',
  props: {
    showLine: true,
    showIcon: true,
    selectable: true,
    draggable: true,
    onSelect: {
      __type: ['Eval'],
      value:
        'return (selectedKeys,e)=>this.props.onselect.value(selectedKeys,e)',
    },
    onDrop: {
      __type: ['Eval'],
      value: 'return (dropDetails)=>this.props.ondrop.value(dropDetails)',
    },
    treeData: {
      __type: ['Eval'],
      value: 'return this.props.treedata.value?this.props.treedata.value:[]',
    },
  },
}

export interface NodeTreeProps {
  treedata: DataNode[]
  onselect: TreeProps['onSelect']
  ondrop: TreeProps['onDrop']
}
export const NodeTree = Renderer.components<NodeTreeProps>(nodeTreeData)
