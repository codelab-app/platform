import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const treeNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: [PropType.Eval],
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
