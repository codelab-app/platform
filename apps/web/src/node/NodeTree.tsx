import { TreeDom } from '@codelab/core/renderer'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const nodeTreeData: NodeDtoReactI = {
  type: 'React.Tree',
  props: {
    showLine: true,
    showIcon: true,
    // onSelect: {
    //   eval: true,
    //   value: '(values)=>{console.log("node. onSelect"); this.props.onTreeNodeSelected.value(values)}'
    // },
    treeData: {
      eval: true,
      value: 'return []',
      // value: 'return this.props.treeDataNodes.value?this.props.treeDataNodes.value:[]',
    },
  },
}

export const NodeTree = TreeDom.render(nodeTreeData)
