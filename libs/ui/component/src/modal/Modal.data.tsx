import { NodeReactI } from '@codelab/shared/interface/node'
import { Button, Modal, Text } from '@codelab/ui/antd'

export const modalButton: NodeReactI<Button.Props | Text.Props> = {
  type: 'React.Button',
  props: {
    type: 'primary',
    onClick: {
      __type: ['Eval'],
      value: `return () => this.send({ type: 'OPEN' })`,
    },
  },
  children: [{ type: 'React.Text', props: { value: 'Open modal' } }],
}

export const modal: NodeReactI<Modal.Props | Text.Props> = {
  type: 'React.Modal',
  props: {
    title: 'Basic Modal',
    footer: null,
    // onOk: {
    //   __type: ['Eval'],
    //   value: `return () => this.send({ type: 'CLOSE' })`,
    // },
    onCancel: {
      __type: ['Eval'],
      value: `return () => {this.send({ type: 'CLOSE' }); this.handlecancel()}`,
    },
    visible: {
      __type: ['Eval'],
      value: 'return this.state.context.visible',
    },
  },
}
