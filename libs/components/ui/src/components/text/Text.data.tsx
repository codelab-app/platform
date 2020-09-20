import { Text } from './Text.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const textData: NodeReactDtoI<Text.Props> = {
  type: 'React.Text',
  props: {
    value: 'Some text',
  },
}
