import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const formLabel: NodeReactI = {
  type: NodeType.React_Form_Item,
  props: {
    label: 'Label',
    name: 'label',
  },
  children: [
    {
      type: NodeType.React_Input,
    },
  ],
}
