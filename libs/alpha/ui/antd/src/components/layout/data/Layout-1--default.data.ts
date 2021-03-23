import { PropType } from '../../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const layoutData: NodeI = {
  type: AtomType.ReactLayout,
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
      type: AtomType.ReactLayoutSider,
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
          type: AtomType.ReactMenu,
          props: {
            theme: 'dark',
            mode: 'inline',
            defaultSelectedKeys: ['1'],
          },
          children: [
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '1',
              },
              children: [
                {
                  type: AtomType.ReactIcon,
                  props: { type: 'user', theme: 'outlined' },
                },
                {
                  type: AtomType.ReactHtmlSpan,
                  children: [
                    {
                      type: AtomType.ReactText,

                      props: {
                        value: 'Option 1',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: AtomType.ReactMenuItem,
              props: {
                key: '2',
              },
              children: [
                {
                  type: AtomType.ReactIcon,
                  props: { type: 'videoCamera', theme: 'outlined' },
                },
                {
                  type: AtomType.ReactHtmlSpan,
                  children: [
                    {
                      type: AtomType.ReactText,
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
      type: AtomType.ReactLayout,
      children: [
        {
          type: AtomType.ReactLayoutHeader,
          children: [
            {
              type: AtomType.ReactMenu,
              props: {
                theme: 'dark',
                mode: 'horizontal',
                defaultSelectedKeys: ['2'],
              },
              children: [
                {
                  type: AtomType.ReactMenuItem,
                  props: {
                    key: '1',
                  },
                  children: [
                    {
                      type: AtomType.ReactText,
                      props: {
                        value: 'nav 1',
                      },
                    },
                  ],
                },
                {
                  type: AtomType.ReactMenuItem,
                  props: {
                    key: '2',
                  },
                  children: [
                    {
                      type: AtomType.ReactText,
                      props: {
                        value: 'nav 2',
                      },
                    },
                  ],
                },
                {
                  type: AtomType.ReactMenuItem,
                  props: {
                    key: '3',
                  },
                  children: [
                    {
                      type: AtomType.ReactText,
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
                  props: { value: 'Content' },
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
