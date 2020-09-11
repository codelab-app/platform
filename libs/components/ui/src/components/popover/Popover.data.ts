import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Popover } from './Popover.types'

export const popoverData: ReactNodeI<Popover.Props | Text.Props> = {
  type: 'Popover',
  nodeType: 'React',
  props: {
    title: 'Title',
    content: {
      type: 'Html.div',
      nodeType: 'React',
      children: [
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            { type: 'Text', nodeType: 'React', props: { value: 'Content' } },
          ],
        },
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            { type: 'Text', nodeType: 'React', props: { value: 'Content' } },
          ],
        },
      ],
    },
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      props: {},
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Hover me',
          },
        },
      ],
    },
  ],
}
