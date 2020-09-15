import { InputNumber } from './InputNumber.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const inputNumberData: NodeDtoI<InputNumber.Props> = {
  type: 'React.InputNumber',
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
