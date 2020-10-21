import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const nodeID: NodeReactI = {
  type: NodeType.React_Form_Item,
  props: {
    label: 'ID',
    name: 'id',
  },
  children: [
    {
      type: NodeType.React_Input,
      props: { disabled: true },
    },
  ],
}
