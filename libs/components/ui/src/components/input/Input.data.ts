import { ReactNodeI } from '@codelab/shared/interface/node'
import { Input } from './Input.types'

export const inputData: ReactNodeI<Input.Props> = {
  type: 'Input',
  nodeType: 'React',
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
