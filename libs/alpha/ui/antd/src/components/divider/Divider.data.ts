import { AtomType, NodeI } from '@codelab/frontend'

export const dividerData: NodeI = {
  type: AtomType.ReactFragment,
  children: [
    {
      type: AtomType.ReactHtmlP,
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
          },
        },
      ],
    },
    {
      type: AtomType.ReactDivider,
      props: {
        orientation: 'center',
        type: 'horizontal',
      },
    },
    {
      type: AtomType.ReactHtmlP,
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
          },
        },
      ],
    },
  ],
}
