import { Input } from './Input.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const inputData: NodeDtoI<Input.Props> = {
  type: 'React.Input',
  props: {
    placeholder: 'Input here',
    style: { width: 300 },
  },
}
