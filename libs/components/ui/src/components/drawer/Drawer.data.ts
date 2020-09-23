import { Button } from '../button'
import { Text } from '../text'
import { DrawerProps } from './Drawer.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const drawerData: NodeReactI<DrawerProps | Button.Props | Text.Props> = {
  type: 'React.Provider',
  props: {
    ctx: {
      eval: true,
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
    onClose: {
      eval: true,
      value: 'return () => this.setVisible(false)',
    },
    visible: {
      eval: true,
      value: 'return this.visible',
    },
    onClick: {
      eval: true,
      value: 'return () => this.setVisible(true)',
    },
  },
  children: [
    {
      type: 'React.Button',
      props: { type: 'React.primary' },
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
        onClick: {
          eval: true,
          value: 'return',
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
