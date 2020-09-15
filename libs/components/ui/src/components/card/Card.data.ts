import { Text } from '../text'
import { Card } from './Card.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const cardData: NodeDtoI<
  Card.Props | Card.GridProps | Card.MetaProps | Text.Props
> = {
  type: 'React.Card',
  props: {
    title: 'Card Title',
  },
  children: [
    {
      type: 'React.Card.Grid',
      props: {
        hoverable: true,
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: 'React.Card.Grid',
      props: {
        hoverable: true,
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: 'React.Card.Grid',
      props: {
        hoverable: true,
      },
      children: [
        {
          type: 'React.Card.Meta',
          props: {
            title: 'Euro Street beat',
            description: 'www.instagram.com',
          },
        },
      ],
    },
  ],
}
