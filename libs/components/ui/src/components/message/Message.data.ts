import { Button } from '../button'
import { Text } from '../text'
import { Message } from './Message.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const messageData: NodeReactI<
  Text.Props | Button.Props | Message.Props | { config: object }
> = {
  type: 'React.Button',
  props: {
    onClick: {
      __type: 'eval',
      value:
        'return () => this.antd.message.info(this.evalProps(this.props.config, this.evalPropsFactory))',
    },
    config: {
      content: 'This is a normal message',
      onClose: {
        __type: 'eval',
        value: 'return () => console.log("Message Closed!")',
      },
    },
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: 'Display message',
      },
    },
  ],
}
