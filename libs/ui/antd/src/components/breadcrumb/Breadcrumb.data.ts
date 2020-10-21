import { Text } from '../text'
import { Breadcrumb } from './Breadcrumb.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const breadcrumbData: NodeReactI<
  | Breadcrumb.Props
  | Breadcrumb.ItemProps
  | Breadcrumb.SeparatorProps
  | Text.Props
> = {
  type: NodeType.React_Breadcrumb,
  children: [
    {
      type: NodeType.React_Breadcrumb_Item,
      props: { href: '#' },
      children: [
        {
          type: NodeType.React_Text,

          props: {
            value: 'Home',
          },
        },
      ],
    },
    {
      type: NodeType.React_Breadcrumb_Item,
      props: { href: '#' },
      children: [
        {
          type: NodeType.React_Text,

          props: {
            value: 'Application Center',
          },
        },
      ],
    },
    {
      type: NodeType.React_Breadcrumb_Item,
      props: {
        href: '#',
        overlay: {
          type: NodeType.React_Menu,
          children: [
            {
              type: NodeType.React_Menu_Item,
              children: [
                {
                  type: NodeType.React_Text,
                  props: {
                    value: 'Detail 1',
                  },
                },
              ],
            },
            {
              type: NodeType.React_Menu_Item,
              children: [
                {
                  type: NodeType.React_Text,
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
          type: NodeType.React_Text,
          props: {
            value: 'Application List',
          },
        },
      ],
    },
    {
      type: NodeType.React_Breadcrumb_Item,
      props: { href: '#' },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'An Application',
          },
        },
      ],
    },
  ],
}
