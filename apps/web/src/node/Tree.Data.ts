import { ReactNodeI } from '@codelab/shared/interface/node'

export const treeData: ReactNodeI = {
  type: 'Tree',
  nodeType: 'React',
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
