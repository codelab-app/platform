import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const notificationData: NodeI = {
  type: AtomType.ReactFragment,
  props: {
    config: {
      __type: [PropType.Eval, PropType.Leaf],
      value: `
        return {
          message: 'Notification Title',
          description: 'This is the content of the notification.',
          onClick: () => console.log("notification clicked!")
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
            return () => this.antd.notification.info(
              this.config
            )
          `,
        },
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Display notification',
          },
        },
      ],
    },
  ],
}
