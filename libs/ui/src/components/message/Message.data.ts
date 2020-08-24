import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { ButtonProps } from '../button/Button'
import { MessageProps } from './Message.types'

export const messageData: ReactNodeI<
  TextProps | ButtonProps | MessageProps | { config: object }
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
