import { ReactNodeI } from '@codelab/node'
import { TextProps } from '../../text/Text.types'
import { LayoutProps, SiderProps } from '../Layout.types'

export const propLayoutData: ReactNodeI<
  LayoutProps | SiderProps | TextProps
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
          type: 'Text',
          nodeType: 'React',
          props: {
            value: { eval: true, value: 'return this.props.Sidebar.value' },
          },
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
              type: 'Text',
              nodeType: 'React',
              props: {
                value: { eval: true, value: 'return this.props.Header.value' },
              },
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
