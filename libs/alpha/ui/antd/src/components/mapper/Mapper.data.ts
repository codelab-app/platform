import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const mapperData: NodeReactI = {
  type: NodeType.React_Mapper,
  props: {
    dataSource: ['Webber', 'Alex', 'Vien'],
    render: {
      type: NodeType.React_Tag,

      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: { __type: [PropType.Eval], value: 'return this.item' },
          },
        },
      ],
    },
  },
}
