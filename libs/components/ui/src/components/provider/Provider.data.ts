import { NodeReactI } from '@codelab/shared/interface/node'

export const providerData: NodeReactI = {
  type: 'React.Provider',
  props: {
    onClick: {
      __type: ['Eval'],
      value: 'return () => console.log("Root onClick cb is fired")',
    },
  },
  children: [
    {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Button',
          children: [
            {
              type: 'React.Text',
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
