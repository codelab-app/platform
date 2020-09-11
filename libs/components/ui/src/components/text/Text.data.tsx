import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from './Text.types'

export const textData: ReactNodeI<Text.Props> = {
  type: 'Text',
  nodeType: 'React',
  props: {
    value: 'Some text',
  },
}
