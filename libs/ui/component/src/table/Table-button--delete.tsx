import { Renderer } from '@codelab/core/renderer'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const buttonDelete: NodeReactI = {
  type: NodeType.React_Button,
  props: {
    type: 'danger',
    onClick: {
      __type: [PropType.Eval],
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
