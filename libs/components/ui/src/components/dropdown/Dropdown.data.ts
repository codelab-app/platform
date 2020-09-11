import { ReactNodeI } from '@codelab/shared/interface/node'
import { Dropdown } from './Dropdown.types'
import { Text } from '../text'

export const dropdownData: ReactNodeI<
  Dropdown.Props | Text.Props | Dropdown.ButtonProps
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
