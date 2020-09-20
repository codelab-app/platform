import { InputNumber } from './InputNumber.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const inputNumberData: NodeDtoReactI<InputNumber.Props> = {
  type: 'React.InputNumber',
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
