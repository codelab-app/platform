import { AtomType, NodeI } from '@codelab/frontend'

export const carouselData: NodeI = {
  type: AtomType.ReactCarousel,
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
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactText,
          props: { value: 'Slide 1' },
        },
      ],
    },
    {
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactText,
          props: { value: 'Slide 2' },
        },
      ],
    },
    {
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactText,
          props: { value: 'Slide 3' },
        },
      ],
    },
  ],
}
