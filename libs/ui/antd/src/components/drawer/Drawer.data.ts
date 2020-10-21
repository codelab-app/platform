import { Button } from '../button'
import { Text } from '../text'
import { DrawerProps } from './Drawer.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const drawerData: NodeReactI<DrawerProps | Button.Props | Text.Props> = {
  type: NodeType.React_Fragment,
  props: {
    ctx: {
      __type: ['Eval', 'Single'],
      value: `
        const [visible, setVisible] = this.React.useState(false);

        return { visible, setVisible }
      `,
    },
  },
  children: [
    {
      type: NodeType.React_Button,
      props: {
        type: 'primary',
        onClick: {
          __type: ['Eval'],
          value: 'return () => this.ctx.setVisible(true)',
        },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Open',
          },
        },
      ],
    },
    {
      type: NodeType.React_Drawer,
      props: {
        title: 'Basic Drawer',
        onClose: {
          __type: ['Eval'],
          value: 'return () => this.ctx.setVisible(false)',
        },
        visible: {
          __type: ['Eval'],
          value: 'return this.ctx.visible',
        },
      },
      children: [
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,

              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
      ],
    },
  ],
}
