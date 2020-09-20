import { Text } from '../text'
import { Tag } from './Tag.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const tagData: NodeDtoReactI<Tag.Props | Text.Props> = {
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
