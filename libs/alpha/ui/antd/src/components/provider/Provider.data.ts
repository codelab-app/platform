import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const providerData: NodeReactI = {
  type: NodeType.React_Provider,
  props: {
    onClick: {
      __type: [PropType.Eval],
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
