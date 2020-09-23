import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'

export const nodeTreeData: NodeReactI = {
  type: 'React.Tree',
  props: {
    showLine: true,
    showIcon: true,
    // onSelect: {
    //   __type: 'eval',
    //   value: '(values)=>{console.log("node. onSelect"); this.props.onTreeNodeSelected.value(values)}'
    // },
    treeData: {
      __type: 'eval',
      value: 'return []',
      // value: 'return this.props.treeDataNodes.value?this.props.treeDataNodes.value:[]',
    },
  },
}

export const NodeTree = Renderer.components(nodeTreeData)
