import { Renderer } from '@codelab/core/renderer'
import { NodeReactI } from '@codelab/shared/interface/node'

export const buttonEdit: NodeReactI = {
  type: 'React.Button',
  props: {
    type: 'React.warning',
    onClick: {
      __type: ['Eval'],
      value: 'return () => this.handleedit(this.record.id)',
    },
  },
  children: [
    {
      type: 'React.Text',
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
