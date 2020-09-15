import { Text } from './Text.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const textData: NodeDtoI<Text.Props> = {
  type: 'React.Text',
  props: {
    value: 'Some text',
  },
}
