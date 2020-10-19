import { NodeReactI } from '@codelab/shared/interface/node'
import { Button, Modal, Text } from '@codelab/ui/antd'

export const modalButton: NodeReactI<Button.Props | Text.Props> = {
  type: 'React.Button',
  props: {
    type: 'primary',
    onClick: {
      __type: ['Eval'],
      value: `return () => this.send({ type: 'OPEN_MODAL' })`,
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
      value: `return () => this.send({ type: 'CLOSE_MODAL' })`,
    },
    onCancel: {
      __type: ['Eval'],
      value: `return () => this.send({ type: 'CLOSE_MODAL' })`,
    },
    visible: {
      __type: ['Eval'],
      value: 'return this.state.context.modal.visible',
    },
  },
  // children: [
  //   {
  //     type: 'React.Html.p',
  //     children: [
  //       {
  //         type: 'React.Text',
  //         props: {
  //           value: 'Some contents...',
  //         },
  //       },
  //     ],
  //   },
  // ],
}
