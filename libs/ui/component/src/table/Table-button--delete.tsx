import { Renderer } from '@codelab/core/renderer'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const buttonDelete: NodeReactI = {
  type: NodeType.React_Button,
  props: {
    type: 'danger',
    onClick: {
      __type: ['Eval'],
      value: 'return () => this.handledelete(this.record.id)',
    },
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Delete',
      },
    },
  ],
}

interface ButtonDeleteProps {
  record: any
  handledelete: Function
}

export const ButtonDelete = Renderer.components<ButtonDeleteProps>(buttonDelete)
