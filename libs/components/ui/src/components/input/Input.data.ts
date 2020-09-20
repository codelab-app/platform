import { Input } from './Input.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const inputData: NodeDtoReactI<Input.Props> = {
  type: 'React.Input',
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
