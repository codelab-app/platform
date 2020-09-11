import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from '../button'
import { DrawerProps } from './Drawer.types'

export const drawerData: ReactNodeI<DrawerProps | Button.Props | Text.Props> = {
  type: 'Provider',
  nodeType: 'React',
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
      type: 'Button',
      nodeType: 'React',
      props: { type: 'primary' },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Open',
          },
        },
      ],
    },
    {
      type: 'Drawer',
      nodeType: 'React',
      props: {
        title: 'Basic Drawer',
        onClick: {
          eval: true,
          value: 'return',
        },
      },
      children: [
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
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
