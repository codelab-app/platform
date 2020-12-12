import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'
import { Button, Modal, Text } from '@codelab/alpha/ui/antd'

export const modalButton: NodeReactI<Button.Props | Text.Props> = {
  type: NodeType.React_Button,
  props: {
    type: 'primary',
    onClick: {
      __type: [PropType.Eval],
      value: `return () => this.send({ type: 'OPEN' })`,
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
      value: `return () => this.send({ type: 'OK' })`,
    },
    onCancel: {
      __type: [PropType.Eval],
      value: `return () => this.send({ type: 'CLOSE' })`,
    },
    visible: {
      __type: [PropType.Eval],
      value: 'return this.state.context.visible',
    },
  },
}
