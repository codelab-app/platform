import { Text } from '../text'
import { Popover } from './Popover.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const popoverData: NodeReactI<Popover.Props | Text.Props> = {
  type: NodeType.React_Popover,
  props: {
    title: 'Title',
    content: {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,
              props: { value: 'Content' },
            },
          ],
        },
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,
              props: { value: 'Content' },
            },
          ],
        },
      ],
    },
  },
  children: [
    {
      type: NodeType.React_Button,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Hover me',
          },
        },
      ],
    },
  ],
}
