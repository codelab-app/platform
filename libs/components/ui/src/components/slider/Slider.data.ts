import { Slider } from './Slider.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const sliderData: NodeDtoI<Slider.Props> = {
  type: 'React.Slider',
  props: {
    defaultValue: 20,
    min: 0,
    max: 50,
  },
}
