import { Slider } from './Slider.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const sliderData: NodeReactI<Slider.Props> = {
  type: NodeType.React_Slider,
  props: {
    defaultValue: 20,
    min: 0,
    max: 50,
  },
}
