import { ReactNodeI } from '@codelab/graph'
import { ButtonProps } from '../button'
import { ModalProps } from './Modal.types'

export const modalData: ReactNodeI<ModalProps | ButtonProps> = {
  type: 'Provider',
  nodeType: 'React',
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
      nodeType: 'React',
      type: 'Button',
      props: { type: 'primary' },
      children: [
        { type: 'Text', nodeType: 'React', props: { value: 'Open modal' } },
      ],
    },
    {
      type: 'Modal',
      nodeType: 'React',
      props: {
        title: 'Basic Modal',
      },
      children: [
        {
          type: 'Html.p',
          nodeType: 'React',
          children: [
            {
              type: 'Text',
              nodeType: 'React',
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
