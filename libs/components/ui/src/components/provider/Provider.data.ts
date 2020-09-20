import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const providerData: NodeReactDtoI = {
  type: 'React.Provider',
  props: {
    onClick: {
      eval: true,
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
