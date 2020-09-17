import { ReactNodeI } from '@codelab/shared/interface/node'
import { Button } from '../button'
import { Modal } from './Modal.types'

export const modalData: ReactNodeI<Modal.Props | Button.Props> = {
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

export const modalDataWithForm: ReactNodeI<Modal.Props | Button.Props> = {
  type: 'Provider',
  nodeType: 'React',
  props: {
    ctx: {
      eval: true,
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },

    onFinish: {
      eval: true,
      // renderProps: 'leaf',
      value:
        'return () => {console.log("form is submitted"); this.setVisible(false)}',
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
        footer: null,
      },
      children: [
        {
          type: 'Form',
          nodeType: 'React',
          props: {
            name: 'form',
          },
          children: [
            {
              type: 'Form.Item',
              nodeType: 'React',
              children: [
                {
                  type: 'Button',
                  nodeType: 'React',
                  props: {
                    type: 'primary',
                    htmlType: 'submit',
                  },
                  children: [
                    {
                      type: 'Text',
                      nodeType: 'React',
                      props: {
                        value: 'Submit',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
