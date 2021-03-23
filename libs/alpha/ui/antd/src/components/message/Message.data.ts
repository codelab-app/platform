import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const messageData: NodeI = {
  type: AtomType.ReactFragment,
  props: {
    config: {
      __type: [PropType.Eval, PropType.Leaf],
      value: `
        return {
          content: 'This is a normal message',
          onClose: () => console.log("Message Closed!")
        }
      `,
    },
  },
  children: [
    {
      type: AtomType.ReactButton,
      props: {
        onClick: {
          __type: [PropType.Eval],
          value: `
            return () => this.antd.message.info(this.config)
          `,
        },
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Display message',
          },
        },
      ],
    },
  ],
}
