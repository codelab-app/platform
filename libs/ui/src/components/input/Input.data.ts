import { ReactNodeI } from '@codelab/graph'
import { InputProps } from './Input.types'

export const inputData: ReactNodeI<InputProps> = {
  type: 'Input',
  nodeType: 'React',
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
