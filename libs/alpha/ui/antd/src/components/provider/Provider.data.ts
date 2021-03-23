import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const providerData: NodeI = {
  type: AtomType.ReactProvider,
  props: {
    onClick: {
      __type: [PropType.Eval],
      value: 'return () => console.log("Root onClick cb is fired")',
    },
  },
  children: [
    {
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactButton,
          children: [
            {
              type: AtomType.ReactText,
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
