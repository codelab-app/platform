import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const providerData: NodeReactI = {
  type: NodeType.React_Provider,
  props: {
    onClick: {
      __type: ['Eval'],
      value: 'return () => console.log("Root onClick cb is fired")',
    },
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Button,
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Click me',
              },
            },
          ],
        },
      ],
    },
  ],
}
