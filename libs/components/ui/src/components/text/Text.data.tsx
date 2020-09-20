import { Text } from './Text.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const textData: NodeDtoReactI<Text.Props> = {
  type: 'React.Text',
  props: {
    value: 'Some text',
  },
}
