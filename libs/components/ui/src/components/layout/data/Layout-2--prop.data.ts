import { Text } from '../../text'
import { Layout } from '../Layout.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const propLayoutData: NodeDtoI<
  Layout.Props | Layout.SiderProps | Text.Props
> = {
  type: 'React.Layout',
  props: { style: { minHeight: '100vh' }, hasSider: true },
  children: [
    {
      type: 'React.Layout.Sider',
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
          type: 'React.Text',
          props: {
            value: { eval: true, value: 'return this.props.Sidebar.value' },
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
                value: { eval: true, value: 'return this.props.Header.value' },
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
                      eval: true,
                      value: 'return this.props.Content.value',
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
                      eval: true,
                      value: 'return this.props.Footer.value',
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
