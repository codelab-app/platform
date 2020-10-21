import { Button } from '../button'
import { Text } from '../text'
import { Modal } from '.'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const modalData: NodeReactI<Modal.Props | Button.Props | Text.Props> = {
  type: NodeType.React_Fragment,
  props: {
    ctx: {
      __type: ['Eval', 'Leaf'],
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
  },
  children: [
    {
      type: NodeType.React_Button,
      props: {
        type: 'primary',
        onClick: {
          __type: ['Eval'],
          value: 'console.log(this); return () => this.ctx.setVisible(true)',
        },
      },
      children: [{ type: NodeType.React_Text, props: { value: 'Open modal' } }],
    },
    {
      type: NodeType.React_Modal,
      props: {
        title: 'Basic Modal',
        onOk: {
          __type: ['Eval'],
          value: 'return () => this.ctx.setVisible(false)',
        },
        onCancel: {
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
      ],
    },
  ],
}
