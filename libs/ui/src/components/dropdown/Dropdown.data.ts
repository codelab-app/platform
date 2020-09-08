import { ReactNodeI } from '@codelab/node'
import { DropdownButtonProps, DropdownProps } from './Dropdown.types'
import { TextProps } from '../text/Text.types'

export const dropdownData: ReactNodeI<
  DropdownProps | TextProps | DropdownButtonProps
> = {
  type: 'Dropdown',
  nodeType: 'React',
  props: {
    overlay: {
      type: 'Menu',
      nodeType: 'React',
      props: { style: { width: 120 } },
      children: [
        {
          type: 'Menu.Item',
          nodeType: 'React',
          props: {
            key: '1',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Option 1',
              },
            },
          ],
        },
        {
          type: 'Menu.Item',
          nodeType: 'React',
          props: {
            key: '2',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
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
      type: 'Html.a',
      nodeType: 'React',
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
