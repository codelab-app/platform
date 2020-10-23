import { Button } from '../button'
import { Text } from '../text'
import { Message } from './Message.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const messageData: NodeReactI<
  Text.Props | Button.Props | Message.Props | { config: object }
> = {
  type: NodeType.React_Fragment,
  props: {
    config: {
      __type: [PropType.Eval, PropType.Leaf],
      value: `
        return { 
          content: 'This is a normal message',
          onClose: () => console.log("Message Closed!")
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
            return () => this.antd.message.info(this.config)
          `,
        },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Display message',
          },
        },
      ],
    },
  ],
}
