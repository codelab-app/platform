import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Breadcrumb } from './Breadcrumb.types'

export const breadcrumbData: ReactNodeI<
  | Breadcrumb.Props
  | Breadcrumb.ItemProps
  | Breadcrumb.SeparatorProps
  | Text.Props
> = {
  type: 'Breadcrumb',
  nodeType: 'React',
  children: [
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: { href: '#' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Home',
          },
        },
      ],
    },
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: { href: '#' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Application Center',
          },
        },
      ],
    },
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: {
        href: '#',
        overlay: {
          type: 'Menu',
          nodeType: 'React',
          children: [
            {
              type: 'Menu.Item',
              nodeType: 'React',
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: {
                    value: 'Detail 1',
                  },
                },
              ],
            },
            {
              type: 'Menu.Item',
              nodeType: 'React',
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
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
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Application List',
          },
        },
      ],
    },
    {
      type: 'Breadcrumb.Item',
      nodeType: 'React',
      props: { href: '#' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'An Application',
          },
        },
      ],
    },
  ],
}
