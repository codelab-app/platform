import { ReactNodeI } from '@codelab/node'
import { InputProps } from './Input.types'

export const inputData: ReactNodeI<InputProps> = {
  type: 'Input',
  nodeType: 'React',
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
