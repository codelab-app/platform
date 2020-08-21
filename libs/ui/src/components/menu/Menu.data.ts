import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import {
  MenuProps,
  ItemProps,
  SubmenuProps,
  ItemGroupProps,
} from './Menu.types'

export const menuData: ReactNodeI<
  MenuProps | ItemProps | SubmenuProps | ItemGroupProps | TextProps
> = {
  type: 'Menu',
  nodeType: 'React',
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
      type: 'Menu.SubMenu',
      nodeType: 'React',
      props: {
        key: 'sub1',
        title: 'Navigation One',
        icon: {
          type: 'Icon',
          nodeType: 'React',
          props: {
            type: 'mail',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: 'Menu.ItemGroup',
          nodeType: 'React',
          props: {
            key: 'g1',
            title: 'Item 1',
          },
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
        {
          type: 'Menu.ItemGroup',
          nodeType: 'React',
          props: {
            key: 'g2',
            title: 'Item 2',
          },
          children: [
            {
              type: 'Menu.Item',
              nodeType: 'React',
              props: {
                key: '3',
              },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: {
                    value: 'Option 3',
                  },
                },
              ],
            },
            {
              type: 'Menu.Item',
              nodeType: 'React',
              props: {
                key: '4',
              },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
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
      type: 'Menu.SubMenu',
      nodeType: 'React',
      props: {
        key: 'sub2',
        title: 'Navigation Two',
        icon: {
          type: 'Icon',
          nodeType: 'React',
          props: {
            type: 'appstore',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: 'Menu.Item',
          nodeType: 'React',
          props: {
            key: '5',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Option 5',
              },
            },
          ],
        },
        {
          type: 'Menu.Item',
          nodeType: 'React',
          props: {
            key: '6',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Option 6',
              },
            },
          ],
        },
        {
          type: 'Menu.SubMenu',
          nodeType: 'React',
          props: {
            key: 'sub3',
            title: 'Submenu',
          },
          children: [
            {
              type: 'Menu.Item',
              nodeType: 'React',
              props: {
                key: '7',
              },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: {
                    value: 'Option 7',
                  },
                },
              ],
            },
            {
              type: 'Menu.Item',
              nodeType: 'React',
              props: {
                key: '8',
              },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
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
