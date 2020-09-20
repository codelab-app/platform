import { Text } from '../text'
import { Popover } from './Popover.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const popoverData: NodeReactDtoI<Popover.Props | Text.Props> = {
  type: 'React.Popover',
  props: {
    title: 'Title',
    content: {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Html.p',
          children: [
            {
              type: 'React.Text',
              props: { value: 'Content' },
            },
          ],
        },
        {
          type: 'React.Html.p',
          children: [
            {
              type: 'React.Text',
              props: { value: 'Content' },
            },
          ],
        },
      ],
    },
  },
  children: [
    {
      type: 'React.Button',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Hover me',
          },
        },
      ],
    },
  ],
}
