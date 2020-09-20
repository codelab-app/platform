import { Text } from '../text'
import { Tag } from './Tag.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const tagData: NodeReactDtoI<Tag.Props | Text.Props> = {
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
