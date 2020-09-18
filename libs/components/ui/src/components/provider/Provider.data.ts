import { ReactNodeI } from '@codelab/shared/interface/node'

export const providerData: ReactNodeI = {
  type: 'Provider',
  nodeType: 'React',
  props: {
    onClick: {
      eval: true,
      value: 'return () => console.log("Root onClick cb is fired")',
    },
  },
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        {
          type: 'Button',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
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
