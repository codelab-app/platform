import { ReactNodeI } from '@codelab/shared/interface/node'
import { Slider } from './Slider.types'

export const sliderData: ReactNodeI<Slider.Props> = {
  type: 'Slider',
  nodeType: 'React',
  props: {
    defaultValue: 20,
    min: 0,
    max: 50,
  },
}
