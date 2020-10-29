import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'
import { Button, Modal, Text } from '@codelab/ui/antd'

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
      value: `return () => this.send({ type: 'CLOSE' })`,
    },
    onCancel: {
      __type: [PropType.Eval],
      value: `return () => { this.send({ type: 'CLOSE' }); this.handlecancel() }`,
    },
    visible: {
      __type: [PropType.Eval],
      value: 'return this.state.context.visible',
    },
  },
}
