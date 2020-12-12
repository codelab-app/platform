import { Renderer } from '@codelab/alpha/core/renderer'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

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
