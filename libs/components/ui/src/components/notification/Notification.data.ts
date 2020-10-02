import { Button } from '../button'
import { Text } from '../text'
import { Notification } from './Notification.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const notificationData: NodeReactI<
  Text.Props | Notification.Props | Button.Props | { config: object }
> = {
  type: 'React.Fragment',
  props: {
    config: {
      __type: ['Eval', 'Leaf'],
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
      type: 'React.Button',
      props: {
        onClick: {
          __type: ['Eval'],
          value: `
            return () => this.antd.notification.info(
              this.config
            )
          `,
        },
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Display notification',
          },
        },
      ],
    },
  ],
}
