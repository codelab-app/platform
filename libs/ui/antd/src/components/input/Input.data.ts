import { Input } from './Input.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const inputData: NodeReactI<Input.Props> = {
  type: 'React.Input',
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
