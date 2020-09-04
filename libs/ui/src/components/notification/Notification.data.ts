import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { ButtonProps } from '../button'
import { NotificationProps } from './Notification.types'

export const notificationData: ReactNodeI<
  TextProps | NotificationProps | ButtonProps | { config: object }
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
