import { ComponentProps } from '@codelab/shared/interface/component'
import { NodeReactI } from '@codelab/shared/interface/node'
import { ContextModal, EventModal } from '@codelab/state/modal'
import { Button, Modal, Text } from '@codelab/ui/antd'

type ModalProps = ComponentProps<ContextModal, EventModal>

export const modalButton: NodeReactI<Button.Props | Text.Props> = {
  type: 'React.Button',
  props: {
    type: 'primary',
    onClick: {
      __type: ['Eval'],
      value: 'return () => this.ctx.setVisible(true)',
    },
  },
  children: [{ type: 'React.Text', props: { value: 'Open modal' } }],
}

export const modal: NodeReactI<Modal.Props | Text.Props> = {
  type: 'React.Modal',
  props: {
    title: 'Basic Modal',
    onOk: {
      __type: ['Eval'],
      value: `return () => this.send({ type: 'CLOSE' })`,
    },
    onCancel: {
      __type: ['Eval'],
      value: `return () => this.send({ type: 'CLOSE' })`,
    },
    visible: {
      __type: ['Eval'],
      value: 'return this.state.visible',
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
}
