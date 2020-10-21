import { Text } from '../text'
import { Dropdown } from './Dropdown.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const dropdownData: NodeReactI<
  Dropdown.Props | Text.Props | Dropdown.ButtonProps
> = {
  type: NodeType.React_Dropdown,
  props: {
    overlay: {
      type: NodeType.React_Menu,
      props: { style: { width: 120 } },
      children: [
        {
          type: NodeType.React_Menu_Item,
          props: {
            key: '1',
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Option 1',
              },
            },
          ],
        },
        {
          type: NodeType.React_Menu_Item,
          props: {
            key: '2',
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Option 2',
              },
            },
          ],
        },
      ],
    },
  },
  children: [
    {
      type: NodeType.React_Html_A,
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
