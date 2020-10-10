import { NodeReactI } from '@codelab/shared/interface/node'
import { Button, Modal, Text } from '@codelab/ui/antd'

export const modalData: NodeReactI<Modal.Props | Button.Props | Text.Props> = {
  type: 'React.Fragment',
  props: {
    ctx: {
      __type: ['Eval', 'Leaf'],
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
  },
  children: [
    {
      type: 'React.Button',
      props: {
        type: 'primary',
        onClick: {
          __type: ['Eval'],
          value: 'console.log(this); return () => this.ctx.setVisible(true)',
        },
      },
      children: [{ type: 'React.Text', props: { value: 'Open modal' } }],
    },
    {
      type: 'React.Modal',
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
