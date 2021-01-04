import { Text } from '../text'
import { Button } from './Button.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const buttonData: NodeReactI<Button.Props | Text.Props> = {
  type: NodeType.React_Button,
  props: {
    type: 'primary',
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Click me',
      },
    },
  ],
}

export const buttonEvalData: NodeReactI<Button.Props | Text.Props> = {
  type: NodeType.React_Button,
  props: {
    onClick: {
      __type: [PropType.Eval],
      value: `return () => console.log(this.ctx.a)`,
    },
    type: 'primary',
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Click me',
      },
    },
  ],
}
