import { Text } from '../text'
import { Breadcrumb } from './Breadcrumb.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const breadcrumbData: NodeReactDtoI<
  | Breadcrumb.Props
  | Breadcrumb.ItemProps
  | Breadcrumb.SeparatorProps
  | Text.Props
> = {
  type: 'React.Breadcrumb',
  children: [
    {
      type: 'React.Breadcrumb.Item',
      props: { href: '#' },
      children: [
        {
          type: 'React.Text',

          props: {
            value: 'Home',
          },
        },
      ],
    },
    {
      type: 'React.Breadcrumb.Item',
      props: { href: '#' },
      children: [
        {
          type: 'React.Text',

          props: {
            value: 'Application Center',
          },
        },
      ],
    },
    {
      type: 'React.Breadcrumb.Item',
      props: {
        href: '#',
        overlay: {
          type: 'React.Menu',
          children: [
            {
              type: 'React.Menu.Item',
              children: [
                {
                  type: 'React.Text',
                  props: {
                    value: 'Detail 1',
                  },
                },
              ],
            },
            {
              type: 'React.Menu.Item',
              children: [
                {
                  type: 'React.Text',
                  props: {
                    value: 'Detail 2',
                  },
                },
              ],
            },
          ],
        },
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Application List',
          },
        },
      ],
    },
    {
      type: 'React.Breadcrumb.Item',
      props: { href: '#' },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'An Application',
          },
        },
      ],
    },
  ],
}
