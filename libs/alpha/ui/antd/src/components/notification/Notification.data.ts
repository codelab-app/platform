import { Button } from '../button'
import { Text } from '../text'
import { Notification } from './Notification.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const notificationData: NodeReactI<
  Text.Props | Notification.Props | Button.Props | { config: object }
> = {
  type: NodeType.React_Fragment,
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
      type: NodeType.React_Button,
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
          type: NodeType.React_Text,
          props: {
            value: 'Display notification',
          },
        },
      ],
    },
  ],
}
