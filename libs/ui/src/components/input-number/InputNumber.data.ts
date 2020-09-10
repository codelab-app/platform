import { ReactNodeI } from '@codelab/shared/interface/node'
import { InputNumberProps } from './InputNumber.types'

export const inputNumberData: ReactNodeI<InputNumberProps> = {
  type: 'InputNumber',
  nodeType: 'React',
  props: {
    min: 1,
    max: 10,
    defaultValue: 3,
  },
}
