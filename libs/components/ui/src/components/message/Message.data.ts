import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from '../button'
import { Message } from './Message.types'

export const messageData: ReactNodeI<
  Text.Props | Button.Props | Message.Props | { config: object }
> = {
  type: 'Provider',
  nodeType: 'React',
  props: {
    onClick: {
      eval: true,
      value:
        'return () => this.antd.message.info(this.evalProps(this.props.config, {}))',
    },
    config: {
      content: 'This is a normal message',
      onClose: {
        eval: true,
        value: 'return () => console.log("Message Closed!")',
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
            value: 'Display message',
          },
        },
      ],
    },
  ],
}
