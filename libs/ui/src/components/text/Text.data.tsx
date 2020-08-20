import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'

export const textPropKeys = ['value'] as const

export type TextProps = PropsFromKeys<typeof textPropKeys[number]>

export const textData: ReactNodeI<TextProps> = {
  type: 'Text',
  nodeType: 'React',
  props: {
    value: 'Some text',
  },
}
