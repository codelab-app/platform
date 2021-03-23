import { AtomType, NodeI } from '@codelab/frontend'

export const popoverData: NodeI = {
  type: AtomType.ReactPopover,
  props: {
    title: 'Title',
    content: {
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactHtmlP,
          children: [
            {
              type: AtomType.ReactText,
              props: { value: 'Content' },
            },
          ],
        },
        {
          type: AtomType.ReactHtmlP,
          children: [
            {
              type: AtomType.ReactText,
              props: { value: 'Content' },
            },
          ],
        },
      ],
    },
  },
  children: [
    {
      type: AtomType.ReactButton,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Hover me',
          },
        },
      ],
    },
  ],
}
