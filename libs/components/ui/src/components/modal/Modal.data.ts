import { Button } from '../button'
import { Modal } from './Modal.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const modalData: NodeDtoReactI<Modal.Props | Button.Props> = {
  type: 'React.Provider',
  props: {
    ctx: {
      eval: true,
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
    onOk: {
      eval: true,
      value: 'return () => this.setVisible(false)',
    },
    onCancel: {
      eval: true,
      value: 'return () => this.setVisible(false)',
    },
    visible: {
      eval: true,
      value: 'return this.visible',
    },
    onClick: {
      eval: true,
      value: 'return () => this.setVisible(true)',
    },
  },
  children: [
    {
      type: 'React.Button',
      props: { type: 'primary' },
      children: [{ type: 'React.Text', props: { value: 'Open modal' } }],
    },
    {
      type: 'React.Modal',
      props: {
        title: 'Basic Modal',
      },
      children: [
        {
          type: 'React.Html.p',
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Some contents...',
              },
            },
          ],
        },
      ],
    },
  ],
}
