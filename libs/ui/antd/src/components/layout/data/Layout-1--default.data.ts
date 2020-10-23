import { Icon } from '../../icon'
import { Menu } from '../../menu'
import { Text } from '../../text'
import { Layout } from '../Layout.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const layoutData: NodeReactI<
  | Layout.Props
  | Layout.SiderProps
  | Text.Props
  | Menu.Props
  | Menu.ItemProps
  | Icon.Props
> = {
  type: NodeType.React_Layout,
  props: {
    style: { minHeight: '100vh' },
    ctx: {
      __type: [PropType.Eval, PropType.Leaf],
      value:
        'const [collapsed, setCollapsed] = this.React.useState(false); return { collapsed, setCollapsed }',
    },
  },
  children: [
    {
      type: NodeType.React_Layout_Sider,
      props: {
        collapsible: true,
        onCollapse: {
          __type: [PropType.Eval],
          value: 'return () => this.ctx.setCollapsed(!this.ctx.collapsed);',
        },
        collapsed: {
          __type: [PropType.Eval],
          value: 'return this.ctx.collapsed',
        },
      },
      children: [
        {
          type: NodeType.React_Menu,
          props: {
            theme: 'dark',
            mode: 'inline',
            defaultSelectedKeys: ['1'],
          },
          children: [
            {
              type: NodeType.React_Menu_Item,
              props: {
                key: '1',
              },
              children: [
                {
                  type: NodeType.React_Icon,
                  props: { type: 'user', theme: 'outlined' },
                },
                {
                  type: NodeType.React_Html_Span,
                  children: [
                    {
                      type: NodeType.React_Text,

                      props: {
                        value: 'Option 1',
                      },
                    },
                  ],
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
                  type: NodeType.React_Icon,
                  props: { type: 'videoCamera', theme: 'outlined' },
                },
                {
                  type: NodeType.React_Html_Span,
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
          ],
        },
      ],
    },
    {
      type: NodeType.React_Layout,
      children: [
        {
          type: NodeType.React_Layout_Header,
          children: [
            {
              type: NodeType.React_Menu,
              props: {
                theme: 'dark',
                mode: 'horizontal',
                defaultSelectedKeys: ['2'],
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
                        value: 'nav 1',
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
                        value: 'nav 2',
                      },
                    },
                  ],
                },
                {
                  type: NodeType.React_Menu_Item,
                  props: {
                    key: '3',
                  },
                  children: [
                    {
                      type: NodeType.React_Text,
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
          type: NodeType.React_Layout_Content,
          props: {
            style: {
              margin: '24px 16px 0',
            },
          },
          children: [
            {
              type: NodeType.React_Html_Div,
              props: { style: { padding: 24 } },
              children: [
                {
                  type: NodeType.React_Text,
                  props: { value: 'Content' },
                },
              ],
            },
          ],
        },
        {
          type: NodeType.React_Layout_Footer,
          children: [
            {
              type: NodeType.React_Html_P,
              children: [
                {
                  type: NodeType.React_Text,
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
