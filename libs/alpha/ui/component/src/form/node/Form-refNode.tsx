import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const refNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: [PropType.Eval],
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
