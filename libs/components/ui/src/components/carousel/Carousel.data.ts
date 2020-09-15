import { Text } from '../text'
import { Carousel } from './Carousel.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const carouselData: NodeDtoI<Carousel.Props | Text.Props> = {
  type: 'React.Carousel',
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
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Text',
          props: { value: 'Slide 1' },
        },
      ],
    },
    {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Text',
          props: { value: 'Slide 2' },
        },
      ],
    },
    {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Text',
          props: { value: 'Slide 3' },
        },
      ],
    },
  ],
}
