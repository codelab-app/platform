import { Button } from '../button'
import { Text } from '../text'
import { DrawerProps } from './Drawer.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const drawerData: NodeReactI<DrawerProps | Button.Props | Text.Props> = {
  type: 'React.Fragment',
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
      type: 'React.Button',
      props: {
        type: 'primary',
        onClick: {
          __type: ['Eval'],
          value: 'return () => this.ctx.setVisible(true)',
        },
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Open',
          },
        },
      ],
    },
    {
      type: 'React.Drawer',
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
          type: 'React.Html.p',
          children: [
            {
              type: 'React.Text',

              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
        {
          type: 'React.Html.p',
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
        {
          type: 'React.Html.p',
          children: [
            {
              type: 'React.Text',
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
