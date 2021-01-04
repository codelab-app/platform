import { InputNumber } from './InputNumber.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const inputNumberData: NodeReactI<InputNumber.Props> = {
  type: NodeType.React_InputNumber,
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
