import { Button } from '../button'
import { Text } from '../text'
import { DrawerProps } from './Drawer.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const drawerData: NodeReactI<DrawerProps | Button.Props | Text.Props> = {
  type: NodeType.React_Fragment,
  props: {
    ctx: {
      __type: [PropType.Eval, PropType.Single],
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
          __type: [PropType.Eval],
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
          __type: [PropType.Eval],
          value: 'return () => this.ctx.setVisible(false)',
        },
        visible: {
          __type: [PropType.Eval],
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
