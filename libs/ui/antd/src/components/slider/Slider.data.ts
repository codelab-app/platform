import { Slider } from './Slider.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const sliderData: NodeReactI<Slider.Props> = {
  type: 'React.Slider',
  props: {
    defaultValue: 20,
    min: 0,
    max: 50,
  },
}
