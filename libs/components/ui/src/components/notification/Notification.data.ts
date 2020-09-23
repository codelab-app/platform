import { Button } from '../button'
import { Text } from '../text'
import { Notification } from './Notification.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const notificationData: NodeReactI<
  Text.Props | Notification.Props | Button.Props | { config: object }
> = {
  type: 'React.Button',
  props: {
    onClick: {
      __type: 'eval',
      value:
        'return () => this.antd.notification.info(this.evalProps(this.props.config, this.evalPropsFactory))',
    },
    config: {
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      onClick: {
        __type: 'eval',
        value: 'return () => console.log("Notification Clicked!")',
      },
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
}
