import { Text } from '../text'
import { Menu } from './Menu.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const menuData: NodeReactI<
  | Menu.Props
  | Menu.ItemProps
  | Menu.SubmenuProps
  | Menu.ItemGroupProps
  | Text.Props
> = {
  type: NodeType.React_Menu,
  props: {
    mode: 'inline',
    theme: 'dark',
    style: {
      width: 256,
    },
    defaultOpenKeys: ['sub1'],
  },
  children: [
    {
      type: NodeType.React_Menu_SubMenu,
      props: {
        key: 'sub1',
        title: 'Navigation One',
        icon: {
          type: NodeType.React_Icon,
          props: {
            type: 'mail',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: NodeType.React_Menu_ItemGroup,
          props: {
            key: 'g1',
            title: 'Item 1',
          },
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
        {
          type: NodeType.React_Menu_ItemGroup,
          props: {
            key: 'g2',
            title: 'Item 2',
          },
          children: [
            {
              type: NodeType.React_Menu_Item,
              props: {
                key: '3',
              },
              children: [
                {
                  type: NodeType.React_Text,
                  props: {
                    value: 'Option 3',
                  },
                },
              ],
            },
            {
              type: NodeType.React_Menu_Item,
              props: {
                key: '4',
              },
              children: [
                {
                  type: NodeType.React_Text,
                  props: {
                    value: 'Option 4',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: NodeType.React_Menu_SubMenu,
      props: {
        key: 'sub2',
        title: 'Navigation Two',
        icon: {
          type: NodeType.React_Icon,
          props: {
            type: 'appstore',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: NodeType.React_Menu_Item,
          props: {
            key: '5',
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Option 5',
              },
            },
          ],
        },
        {
          type: NodeType.React_Menu_Item,
          props: {
            key: '6',
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Option 6',
              },
            },
          ],
        },
        {
          type: NodeType.React_Menu_SubMenu,
          props: {
            key: 'sub3',
            title: 'Submenu',
          },
          children: [
            {
              type: NodeType.React_Menu_Item,
              props: {
                key: '7',
              },
              children: [
                {
                  type: NodeType.React_Text,
                  props: {
                    value: 'Option 7',
                  },
                },
              ],
            },
            {
              type: NodeType.React_Menu_Item,
              props: {
                key: '8',
              },
              children: [
                {
                  type: NodeType.React_Text,
                  props: {
                    value: 'Option 8',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
