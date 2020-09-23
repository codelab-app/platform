import { Text } from '../text'
import { Tag } from './Tag.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const tagData: NodeReactI<Tag.Props | Text.Props> = {
  type: 'React.Tag',
  props: { closable: true },
  children: [
    {
      type: 'React.Text',
      props: {
        value: 'Tag 1',
      },
    },
  ],
}
