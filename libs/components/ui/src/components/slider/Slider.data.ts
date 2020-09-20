import { Slider } from './Slider.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const sliderData: NodeDtoReactI<Slider.Props> = {
  type: 'React.Slider',
  props: {
    defaultValue: 20,
    min: 0,
    max: 50,
  },
}
