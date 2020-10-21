import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const treeNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "Tree"',
    },
  },
  children: [
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'ID',
        name: 'ID',
      },
      children: [{ type: NodeType.React_Input }],
    },
  ],
}
