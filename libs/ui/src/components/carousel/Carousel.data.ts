import { ReactNodeI } from '@codelab/node'
import { TextProps } from '../text/Text.types'
import { CarouselProps } from './Carousel.types'

export const carouselData: ReactNodeI<CarouselProps | TextProps> = {
  type: 'Carousel',
  nodeType: 'React',
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
      type: 'Html.div',
      nodeType: 'React',
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Slide 1' } },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Slide 2' } },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Slide 3' } },
      ],
    },
  ],
}
