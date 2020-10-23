import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'
import { Button, Modal, Text } from '@codelab/ui/antd'

export const modalButton: NodeReactI<Button.Props | Text.Props> = {
  type: NodeType.React_Button,
  props: {
    type: 'primary',
    onClick: {
      __type: [PropType.Eval],
      value: `return () => this.send({ type: 'OPEN_MODAL' })`,
    },
  },
  children: [{ type: NodeType.React_Text, props: { value: 'Open modal' } }],
}

export const modal: NodeReactI<Modal.Props | Text.Props> = {
  type: NodeType.React_Modal,
  props: {
    title: 'Basic Modal',
    onOk: {
      __type: [PropType.Eval],
      value: `return () => this.send({ type: 'CLOSE_MODAL' })`,
    },
    onCancel: {
      __type: [PropType.Eval],
      value: `return () => this.send({ type: 'CLOSE_MODAL' })`,
    },
    visible: {
      __type: [PropType.Eval],
      value: 'return this.state.context.modal.visible',
    },
  },
  // children: [
  //   {
  //     type: 'React.Html.p',
  //     children: [
  //       {
  //         type: NodeType.React_Text,
  //         props: {
  //           value: 'Some contents...',
  //         },
  //       },
  //     ],
  //   },
  // ],
}
