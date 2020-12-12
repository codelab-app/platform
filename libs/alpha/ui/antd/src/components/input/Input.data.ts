import { Input } from './Input.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const inputData: NodeReactI<Input.Props> = {
  type: NodeType.React_Input,
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
