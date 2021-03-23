import { AtomType, NodeI } from '@codelab/frontend'

export const affixData: NodeI = {
  type: AtomType.ReactAffix,
  props: {
    offsetTop: 120,
  },
  children: [
    {
      type: AtomType.ReactButton,
      props: {
        type: 'primary',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: '120px to affix top',
          },
        },
      ],
    },
  ],
}
