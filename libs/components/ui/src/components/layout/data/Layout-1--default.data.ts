import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../../text'
import { Menu } from '../../menu'
import { Layout } from '../Layout.types'

export const layoutData: ReactNodeI<
  Layout.Props | Layout.SiderProps | Text.Props | Menu.Props | Menu.ItemProps
> = {
  type: 'Layout',
  nodeType: 'React',
  props: { style: { minHeight: '100vh' }, hasSider: true },
  children: [
    {
      type: 'Layout.Sider',
      nodeType: 'React',
      props: {
        ctx: {
          eval: true,
          value:
            'const [collapsed, setCollapsed] = this.React.useState(false); return { collapsed, setCollapsed }',
        },
        collapsible: true,
        onCollapse: {
          eval: true,
          value: 'return () => this.setCollapsed(!this.collapsed)',
        },
        collapsed: {
          eval: true,
          value: 'return this.collapsed',
        },
      },
      children: [
        {
          type: 'Menu',
          nodeType: 'React',
          props: {
            theme: 'dark',
            mode: 'inline',
            defaultSelectedKeys: ['1'],
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
                  type: 'Icon',
                  nodeType: 'React',
                  props: { type: 'user', theme: 'outlined' },
                },
                {
                  type: 'Html.span',
                  nodeType: 'React',
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
                  type: 'Icon',
                  nodeType: 'React',
                  props: { type: 'videoCamera', theme: 'outlined' },
                },
                {
                  type: 'Html.span',
                  nodeType: 'React',
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
          ],
        },
      ],
    },

    {
      type: 'Layout',
      nodeType: 'React',
      children: [
        {
          type: 'Layout.Header',
          nodeType: 'React',
          children: [
            {
              type: 'Menu',
              nodeType: 'React',
              props: {
                theme: 'dark',
                mode: 'horizontal',
                defaultSelectedKeys: ['2'],
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
                        value: 'nav 1',
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
                        value: 'nav 2',
                      },
                    },
                  ],
                },
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
                        value: 'nav 3',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Layout.Content',
          nodeType: 'React',
          props: {
            style: {
              margin: '24px 16px 0',
            },
          },
          children: [
            {
              type: 'Html.div',
              nodeType: 'React',
              props: { style: { padding: 24 } },
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: { value: 'Content' },
                  // props: {
                  //   value: {
                  //     eval: true,
                  //     value: 'console.log(this)',
                  //   },
                  // },
                },
              ],
            },
          ],
        },
        {
          type: 'Layout.Footer',
          nodeType: 'React',
          children: [
            {
              type: 'Html.p',
              nodeType: 'React',
              children: [
                {
                  type: 'Text',
                  nodeType: 'React',
                  props: { value: 'Footer' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
