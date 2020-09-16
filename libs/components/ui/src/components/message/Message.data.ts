import { Button } from '../button'
import { Text } from '../text'
import { Message } from './Message.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const messageData: NodeDtoReactI<
  Text.Props | Button.Props | Message.Props | { config: object }
> = {
  type: 'React.Provider',
  props: {
    onClick: {
      eval: true,
      value:
        'return () => this.antd.message.info(this.evalProps(this.props.config, this.evalPropsFactory, {}))',
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
      type: 'React.Button',
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Display message',
          },
        },
      ],
    },
  ],
}
