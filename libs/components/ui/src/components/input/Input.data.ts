import { Input } from './Input.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const inputData: NodeReactDtoI<Input.Props> = {
  type: 'React.Input',
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
