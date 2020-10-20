import { NodeReactI } from '@codelab/shared/interface/node'
import { Layout, Text } from '@codelab/ui/antd'

export const layoutData: NodeReactI<
  Layout.Props | Layout.SiderProps | Text.Props
> = {
  type: 'React.Layout',
  props: {
    style: { minHeight: '100vh' },
    hasSider: true,
  },
  children: [
    {
      type: 'React.Layout.Sider',
      props: {
        collapsible: true,
        onCollapse: {
          __type: ['Eval'],
          value: `return () => {this.state.context.sidebarCollapsed? this.send({type:'CLOSE_SIDEBAR'}): this.send({type:'OPEN_SIDEBAR'})}`,
        },
        collapsed: {
          __type: ['Eval'],
          value: `return !this.state.context.sidebarCollapsed`,
        },
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: { __type: ['Eval'], value: 'return this.sidebar' },
          },
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
              type: 'React.Text',
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
          type: 'React.Layout.Footer',
          children: [
            {
              type: 'React.Html.p',

              children: [
                {
                  type: 'React.Text',
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
