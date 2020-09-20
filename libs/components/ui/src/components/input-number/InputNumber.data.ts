import { InputNumber } from './InputNumber.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const inputNumberData: NodeReactDtoI<InputNumber.Props> = {
  type: 'React.InputNumber',
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
