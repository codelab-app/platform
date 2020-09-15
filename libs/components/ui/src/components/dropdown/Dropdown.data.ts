import { Text } from '../text'
import { Dropdown } from './Dropdown.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const dropdownData: NodeDtoI<
  Dropdown.Props | Text.Props | Dropdown.ButtonProps
> = {
  type: 'React.Dropdown',
  props: {
    overlay: {
      type: 'React.Menu',
      props: { style: { width: 120 } },
      children: [
        {
          type: 'React.Menu.Item',
          props: {
            key: '1',
          },
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Option 1',
              },
            },
          ],
        },
        {
          type: 'React.Menu.Item',
          props: {
            key: '2',
          },
          children: [
            {
              type: 'React.Text',
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
      type: 'React.Html.a',
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
