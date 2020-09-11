import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Tag } from './Tag.types'

export const tagData: ReactNodeI<Tag.Props | Text.Props> = {
  type: 'Tag',
  nodeType: 'React',
  props: { closable: true },
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value: 'Tag 1',
      },
    },
  ],
}
