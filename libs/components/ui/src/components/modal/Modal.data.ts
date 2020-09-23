import { Button } from '../button'
import { Modal } from './Modal.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const modalData: NodeReactI<Modal.Props | Button.Props> = {
  type: 'React.Fragment',
  props: {
    ctx: {
      __type: ['eval', 'single'],
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
  },
  children: [
    {
      type: 'React.Button',
      props: {
        type: 'primary',
        onClick: {
          __type: 'eval',
          value: 'return () => this.setVisible(true)',
        },
      },
      children: [{ type: 'React.Text', props: { value: 'Open modal' } }],
    },
    {
      type: 'React.Modal',
      props: {
        title: 'Basic Modal',
        onOk: {
          __type: 'eval',
          value: 'return () => this.setVisible(false)',
        },
        onCancel: {
          __type: 'eval',
          value: 'return () => this.setVisible(false)',
        },
        visible: {
          __type: 'eval',
          value: 'return this.visible',
        },
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
