import { Text } from '../text'
import { Tag } from './Tag.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const tagData: NodeDtoI<Tag.Props | Text.Props> = {
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
