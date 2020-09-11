import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Card } from './Card.types'

export const cardData: ReactNodeI<
  Card.Props | Card.GridProps | Card.MetaProps | Text.Props
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
