import { Text } from '../text'
import { Tag } from './Tag.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const tagData: NodeReactI<Tag.Props | Text.Props> = {
  type: NodeType.React_Tag,
  props: { closable: true },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Tag 1',
      },
    },
  ],
}
