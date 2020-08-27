import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { CardProps, CardGridProps, CardMetaProps } from './Card.types'

export const cardData: ReactNodeI<
  CardProps | CardGridProps | CardMetaProps | TextProps
> = {
  type: 'Card',
  nodeType: 'React',
  props: {
    title: 'Card Title',
  },
  children: [
    {
      type: 'Card.Grid',
      nodeType: 'React',
      props: {
        hoverable: true,
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: 'Card.Grid',
      nodeType: 'React',
      props: {
        hoverable: true,
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: 'Card.Grid',
      nodeType: 'React',
      props: {
        hoverable: true,
      },
      children: [
        {
          type: 'Card.Meta',
          nodeType: 'React',
          props: {
            title: 'Euro Street beat',
            description: 'www.instagram.com',
          },
        },
      ],
    },
  ],
}
