import { Text } from '../../text'
import { Layout } from '../Layout.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const propLayoutData: NodeReactI<
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
          type: 'React.Text',
          props: {
            value: { __type: 'eval', value: 'return this.props.sidebar' },
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
                  __type: 'eval',
                  value: 'return this.props.header',
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
                      __type: 'eval',
                      value: 'return this.props.content',
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
                      __type: 'eval',
                      value: 'return this.props.footer',
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
