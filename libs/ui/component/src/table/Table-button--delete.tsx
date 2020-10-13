import { Renderer } from '@codelab/core/renderer'
import { NodeReactI } from '@codelab/shared/interface/node'

export const buttonDelete: NodeReactI = {
  type: 'React.Button',
  props: {
    type: 'danger',
    onClick: {
      __type: ['Eval'],
      value: 'return () => this.handledelete(this.record.id)',
    },
  },
  children: [
    {
      type: 'React.Text',
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
