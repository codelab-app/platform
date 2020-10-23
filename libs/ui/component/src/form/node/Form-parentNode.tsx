import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const parentNodeSelect: NodeReactI = {
  type: NodeType.React_Form_Item,
  props: {
    label: 'Parent',
    name: 'parent',
  },
  children: [
    {
      type: NodeType.React_Select,
      props: {
        options: {
          __type: [PropType.Eval],
          value: 'return this.parentnodes ?? []',
        },
      },
    },
  ],
}
