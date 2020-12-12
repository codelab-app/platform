import { Text } from '../text'
import { Card } from './Card.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const cardData: NodeReactI<
  Card.Props | Card.GridProps | Card.MetaProps | Text.Props
> = {
  type: NodeType.React_Card,
  props: {
    title: 'Card Title',
  },
  children: [
    {
      type: NodeType.React_Card_Grid,
      props: {
        hoverable: true,
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: NodeType.React_Card_Grid,
      props: {
        hoverable: true,
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Content',
          },
        },
      ],
    },
    {
      type: NodeType.React_Card_Grid,
      props: {
        hoverable: true,
      },
      children: [
        {
          type: NodeType.React_Card_Meta,
          props: {
            title: 'Euro Street beat',
            description: 'www.instagram.com',
          },
        },
      ],
    },
  ],
}
