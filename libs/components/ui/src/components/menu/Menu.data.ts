import { Text } from '../text'
import { Menu } from './Menu.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const menuData: NodeReactI<
  | Menu.Props
  | Menu.ItemProps
  | Menu.SubmenuProps
  | Menu.ItemGroupProps
  | Text.Props
> = {
  type: 'React.Menu',
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
      type: 'React.Menu.SubMenu',
      props: {
        key: 'sub1',
        title: 'Navigation One',
        icon: {
          type: 'React.Icon',
          props: {
            type: 'React.mail',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: 'React.Menu.ItemGroup',
          props: {
            key: 'g1',
            title: 'Item 1',
          },
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
        {
          type: 'React.Menu.ItemGroup',
          props: {
            key: 'g2',
            title: 'Item 2',
          },
          children: [
            {
              type: 'React.Menu.Item',
              props: {
                key: '3',
              },
              children: [
                {
                  type: 'React.Text',
                  props: {
                    value: 'Option 3',
                  },
                },
              ],
            },
            {
              type: 'React.Menu.Item',
              props: {
                key: '4',
              },
              children: [
                {
                  type: 'React.Text',
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
      type: 'React.Menu.SubMenu',
      props: {
        key: 'sub2',
        title: 'Navigation Two',
        icon: {
          type: 'React.Icon',
          props: {
            type: 'React.appstore',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: 'React.Menu.Item',
          props: {
            key: '5',
          },
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Option 5',
              },
            },
          ],
        },
        {
          type: 'React.Menu.Item',
          props: {
            key: '6',
          },
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Option 6',
              },
            },
          ],
        },
        {
          type: 'React.Menu.SubMenu',
          props: {
            key: 'sub3',
            title: 'Submenu',
          },
          children: [
            {
              type: 'React.Menu.Item',
              props: {
                key: '7',
              },
              children: [
                {
                  type: 'React.Text',
                  props: {
                    value: 'Option 7',
                  },
                },
              ],
            },
            {
              type: 'React.Menu.Item',
              props: {
                key: '8',
              },
              children: [
                {
                  type: 'React.Text',
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
