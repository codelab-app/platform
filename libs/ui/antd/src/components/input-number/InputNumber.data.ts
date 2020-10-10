import { InputNumber } from './InputNumber.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const inputNumberData: NodeReactI<InputNumber.Props> = {
  type: 'React.InputNumber',
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
