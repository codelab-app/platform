import { AtomType, NodeI } from '@codelab/frontend'

export const menuData: NodeI = {
  type: AtomType.ReactMenu,
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
      type: AtomType.ReactMenuSubMenu,
      props: {
        key: 'sub1',
        title: 'Navigation One',
        icon: {
          type: AtomType.ReactIcon,
          props: {
            type: 'mail',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: AtomType.ReactMenuItemGroup,
          props: {
            key: 'g1',
            title: 'Item 1',
          },
          children: [
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '1',
              },
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'Option 1',
                  },
                },
              ],
            },
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '2',
              },
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'Option 2',
                  },
                },
              ],
            },
          ],
        },
        {
          type: AtomType.ReactMenuItemGroup,
          props: {
            key: 'g2',
            title: 'Item 2',
          },
          children: [
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '3',
              },
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'Option 3',
                  },
                },
              ],
            },
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '4',
              },
              children: [
                {
                  type: AtomType.ReactText,
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
      type: AtomType.ReactMenuSubMenu,
      props: {
        key: 'sub2',
        title: 'Navigation Two',
        icon: {
          type: AtomType.ReactIcon,
          props: {
            type: 'appstore',
            theme: 'outlined',
          },
        },
      },
      children: [
        {
          type: AtomType.ReactMenuItem,
          props: {
            key: '5',
          },
          children: [
            {
              type: AtomType.ReactText,
              props: {
                value: 'Option 5',
              },
            },
          ],
        },
        {
          type: AtomType.ReactMenuItem,
          props: {
            key: '6',
          },
          children: [
            {
              type: AtomType.ReactText,
              props: {
                value: 'Option 6',
              },
            },
          ],
        },
        {
          type: AtomType.ReactMenuSubMenu,
          props: {
            key: 'sub3',
            title: 'Submenu',
          },
          children: [
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '7',
              },
              children: [
                {
                  type: AtomType.ReactText,
                  props: {
                    value: 'Option 7',
                  },
                },
              ],
            },
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '8',
              },
              children: [
                {
                  type: AtomType.ReactText,
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
