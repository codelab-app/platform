import { ReactNodeI } from '@codelab/shared/interface/node'
import { TextProps } from '../text/Text.types'
import { PopoverProps } from './Popover.types'

export const popoverData: ReactNodeI<PopoverProps | TextProps> = {
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
