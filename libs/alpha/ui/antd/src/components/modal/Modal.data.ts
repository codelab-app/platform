import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const modalData: NodeI = {
  type: AtomType.ReactFragment,
  props: {
    ctx: {
      __type: [PropType.Eval, PropType.Leaf],
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
  },
  children: [
    {
      type: AtomType.ReactButton,
      props: {
        type: 'primary',
        onClick: {
          __type: [PropType.Eval],
          value: 'console.log(this); return () => this.ctx.setVisible(true)',
        },
      },
      children: [{ type: AtomType.ReactText, props: { value: 'Open modal' } }],
    },
    {
      type: AtomType.ReactModal,
      props: {
        title: 'Basic Modal',
        onOk: {
          __type: [PropType.Eval],
          value: 'return () => this.ctx.setVisible(false)',
        },
        onCancel: {
          __type: [PropType.Eval],
          value: 'return () => this.ctx.setVisible(false)',
        },
        visible: {
          __type: [PropType.Eval],
          value: 'return this.ctx.visible',
        },
      },
      children: [
        {
          type: AtomType.ReactHtmlP,
          children: [
            {
              type: AtomType.ReactText,
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
