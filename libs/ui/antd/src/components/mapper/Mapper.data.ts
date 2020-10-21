import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

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
            value: { __type: ['Eval'], value: 'return this.item' },
          },
        },
      ],
    },
  },
}
