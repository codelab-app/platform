import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const refNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "Ref"',
    },
  },
  children: [
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'id',
        name: 'id',
      },
      children: [{ type: NodeType.React_Input }],
    },
  ],
}
