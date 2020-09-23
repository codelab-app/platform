import { Text } from './Text.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const textData: NodeReactI<Text.Props> = {
  type: 'React.Text',
  props: {
    value: 'Some text',
  },
}
