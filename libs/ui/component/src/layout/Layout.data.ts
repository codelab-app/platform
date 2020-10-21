import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { Layout, Text } from '@codelab/ui/antd'

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
          __type: ['Eval'],
          value: `return () => {this.state.context.visible? this.send({type:'CLOSE'}): this.send({type:'OPEN'})}`,
        },
        collapsed: {
          __type: ['Eval'],
          value: `return !this.state.context.visible`,
        },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: { __type: ['Eval'], value: 'return this.sidebar' },
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
                  __type: ['Eval'],
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
                      __type: ['Eval'],
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
                      __type: ['Eval'],
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
