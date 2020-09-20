import { Slider } from './Slider.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const sliderData: NodeReactDtoI<Slider.Props> = {
  type: 'React.Slider',
  props: {
    defaultValue: 20,
    min: 0,
    max: 50,
  },
}
