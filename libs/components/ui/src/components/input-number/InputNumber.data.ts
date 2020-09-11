import { ReactNodeI } from '@codelab/shared/interface/node'
import { InputNumber } from './InputNumber.types'

export const inputNumberData: ReactNodeI<InputNumber.Props> = {
  type: 'InputNumber',
  nodeType: 'React',
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
