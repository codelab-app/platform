import { ReactNodeI } from '@codelab/graph'

export const sliderData: ReactNodeI = {
  type: 'Slider',
  nodeType: 'React',
  props: {
    defaultValue: 20,
    min: 0,
    max: 50,
  },
  children: [
    {
      nodeType: 'React',
      type: 'Text',
      props: {
        value: 'Slider',
      },
    },
  ],
}
