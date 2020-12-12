import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'
import { Layout, Text } from '@codelab/alpha/ui/antd'

export const layoutData: NodeReactI<
  Layout.Props | Layout.SiderProps | Text.Props
> = {
  type: NodeType.React_Layout,
  props: {
    style: { minHeight: '100vh' },
    hasSider: true,
  },
  children: [
    {
      type: NodeType.React_Layout_Sider,
      props: {
        collapsible: true,
        onCollapse: {
          __type: [PropType.Eval],
          value: `
            return () => {
              this.state.context.sidebarCollapsed ?
                this.send({ type: 'CLOSE_SIDEBAR' }) :
                this.send({ type: 'OPEN_SIDEBAR' })
            }
          `,
        },
        collapsed: {
          __type: [PropType.Eval],
          value: `return !this.state.context.sidebarCollapsed`,
        },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: { __type: [PropType.Eval], value: 'return this.sidebar' },
          },
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
              type: NodeType.React_Text,
              props: {
                value: {
                  __type: [PropType.Eval],
                  value: 'return this.header',
                },
              },
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
                  props: {
                    value: {
                      __type: [PropType.Eval],
                      value: 'return this.content',
                    },
                  },
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
                  props: {
                    value: {
                      __type: [PropType.Eval],
                      value: 'return this.footer',
                    },
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
