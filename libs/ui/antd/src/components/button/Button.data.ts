import { Text } from '../text'
import { Button } from './Button.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const buttonData: NodeReactI<Button.Props | Text.Props> = {
  type: 'React.Button',
  props: {
    type: 'primary',
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: 'Click me',
      },
    },
  ],
}

export const buttonEvalData: NodeReactI<Button.Props | Text.Props> = {
  type: 'React.Button',
  props: {
    onClick: {
      __type: ['Eval'],
      value: `return () => console.log(this.ctx.a)`,
    },
    type: 'primary',
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: 'Click me',
      },
    },
  ],
}
