import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from '../button'
import { Notification } from './Notification.types'

export const notificationData: ReactNodeI<
  Text.Props | Notification.Props | Button.Props | { config: object }
> = {
  type: 'Provider',
  nodeType: 'React',
  props: {
    onClick: {
      eval: true,
      value:
        'return () => this.antd.notification.info(this.evalProps(this.props.config, {}))',
    },
    config: {
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      onClick: {
        eval: true,
        value: 'return () => console.log("Notification Clicked!")',
      },
    },
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Display notification',
          },
        },
      ],
    },
  ],
}
