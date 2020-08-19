import { ReactNodeI } from '@codelab/graph'
import { TextProps } from './Text.types'

export const textData: ReactNodeI<TextProps> = {
  type: 'Text',
  nodeType: 'React',
  props: {
    value: 'Some text',
  },
}
