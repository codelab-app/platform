import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const propsFields: NodeReactI = {
  type: NodeType.React_Form_Item,
  props: {
    label: 'Prop',
  },
  children: [
    {
      type: NodeType.React_Form_List,
      props: {
        name: 'props',
      },
      children: [
        {
          type: NodeType.React_Form_Item,
          props: {
            name: 'key',
          },
          children: [
            {
              type: NodeType.React_Input,
              props: {
                placeholder: 'Key',
              },
            },
          ],
        },
        {
          type: NodeType.React_Form_Item,
          props: {
            name: 'value',
          },
          children: [
            {
              type: NodeType.React_Input,
              props: {
                placeholder: 'Value',
              },
            },
          ],
        },
      ],
    },
  ],
}
