import { PropType } from '../../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const propLayoutData: NodeI = {
  type: AtomType.ReactLayout,
  props: {
    style: { minHeight: '100vh' },
    hasSider: true,
    ctx: {
      __type: [PropType.Eval, PropType.Leaf],
      value: `
        const [collapsed, setCollapsed] = this.React.useState(false);

        return { collapsed, setCollapsed }
      `,
    },
  },
  children: [
    {
      type: AtomType.ReactLayoutSider,
      props: {
        collapsible: true,
        onCollapse: {
          __type: [PropType.Eval],
          value: 'return () => this.ctx.setCollapsed(!this.ctx.collapsed)',
        },
        collapsed: {
          __type: [PropType.Eval],
          value: 'return this.ctx.collapsed',
        },
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: { __type: [PropType.Eval], value: 'return this.sidebar' },
          },
        },
      ],
    },
    {
      type: AtomType.ReactLayout,
      children: [
        {
          type: AtomType.ReactLayoutHeader,
          children: [
            {
              type: AtomType.ReactText,
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
          type: AtomType.ReactLayoutContent,
          props: {
            style: {
              margin: '24px 16px 0',
            },
          },
          children: [
            {
              type: AtomType.ReactHtmlDiv,
              props: { style: { padding: 24 } },
              children: [
                {
                  type: AtomType.ReactText,
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
          type: AtomType.ReactLayoutFooter,
          children: [
            {
              type: AtomType.ReactHtmlP,

              children: [
                {
                  type: AtomType.ReactText,
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
