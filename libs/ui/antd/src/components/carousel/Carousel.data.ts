import { Text } from '../text'
import { Carousel } from './Carousel.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const carouselData: NodeReactI<Carousel.Props | Text.Props> = {
  type: NodeType.React_Carousel,
  props: {
    dotPosition: 'bottom',
    dots: 'true',
    easing: 'linear',
    effect: 'scrollx',
    style: {
      height: '200px',
      color: '#fff',
      lineHeight: '200px',
      textAlign: 'center',
      background: '#364d79',
    },
  },
  children: [
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Text,
          props: { value: 'Slide 1' },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Text,
          props: { value: 'Slide 2' },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Text,
          props: { value: 'Slide 3' },
        },
      ],
    },
  ],
}
