import { Menu } from '../../menu'
import { Text } from '../../text'
import { Layout } from '../Layout.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const layoutData: NodeReactI<
  Layout.Props | Layout.SiderProps | Text.Props | Menu.Props | Menu.ItemProps
> = {
  type: 'React.Layout',
  props: { style: { minHeight: '100vh' }, hasSider: true },
  children: [
    {
      type: 'React.Layout.Sider',
      props: {
        ctx: {
          __type: 'eval',
          value:
            'const [collapsed, setCollapsed] = this.React.useState(false); return { collapsed, setCollapsed }',
        },
        collapsible: true,
        onCollapse: {
          __type: 'eval',
          value: 'return () => this.setCollapsed(!this.collapsed)',
        },
        collapsed: {
          __type: 'eval',
          value: 'return this.collapsed',
        },
      },
      children: [
        {
          type: 'React.Menu',
          props: {
            theme: 'dark',
            mode: 'inline',
            defaultSelectedKeys: ['1'],
          },
          children: [
            {
              type: 'React.Menu.Item',
              props: {
                key: '1',
              },
              children: [
                {
                  type: 'React.Icon',
                  props: { type: 'React.user', theme: 'outlined' },
                },
                {
                  type: 'React.Html.span',
                  children: [
                    {
                      type: 'React.Text',

                      props: {
                        value: 'Option 1',
                      },
                    },
                  ],
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
                  type: 'React.Icon',
                  props: { type: 'React.videoCamera', theme: 'outlined' },
                },
                {
                  type: 'React.Html.span',
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
          ],
        },
      ],
    },

    {
      type: 'React.Layout',
      children: [
        {
          type: 'React.Layout.Header',
          children: [
            {
              type: 'React.Menu',
              props: {
                theme: 'dark',
                mode: 'horizontal',
                defaultSelectedKeys: ['2'],
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
                        value: 'nav 1',
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
                        value: 'nav 2',
                      },
                    },
                  ],
                },
                {
                  type: 'React.Menu.Item',
                  props: {
                    key: '3',
                  },
                  children: [
                    {
                      type: 'React.Text',
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
          type: 'React.Layout.Content',
          props: {
            style: {
              margin: '24px 16px 0',
            },
          },
          children: [
            {
              type: 'React.Html.div',
              props: { style: { padding: 24 } },
              children: [
                {
                  type: 'React.Text',
                  props: { value: 'Content' },
                },
              ],
            },
          ],
        },
        {
          type: 'React.Layout.Footer',
          children: [
            {
              type: 'React.Html.p',
              children: [
                {
                  type: 'React.Text',
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
