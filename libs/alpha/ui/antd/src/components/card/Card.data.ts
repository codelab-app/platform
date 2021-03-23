import { AtomType, NodeI } from '@codelab/frontend'

export const cardData: NodeI = {
  type: AtomType.ReactCard,
  props: {
    title: 'Card Title',
  },
  children: [
    {
      type: AtomType.ReactCardGrid,
      props: {
        hoverable: true,
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: AtomType.ReactCardGrid,
      props: {
        hoverable: true,
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: AtomType.ReactCardGrid,
      props: {
        hoverable: true,
      },
      children: [
        {
          type: AtomType.ReactCardMeta,
          props: {
            title: 'Euro Street beat',
            description: 'www.instagram.com',
          },
        },
      ],
    },
  ],
}
