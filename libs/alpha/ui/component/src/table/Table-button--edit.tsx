import { Renderer } from '@codelab/alpha/core/renderer'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const buttonEdit: NodeReactI = {
  type: NodeType.React_Button,
  props: {
    type: 'warning',
    onClick: {
      __type: [PropType.Eval],
      value: 'return () => this.handleedit(this.record.id)',
    },
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Edit',
      },
    },
  ],
}

interface ButtonEditProps {
  record: any
  handleedit: Function
}

export const ButtonEdit = Renderer.components<ButtonEditProps>(buttonEdit)
