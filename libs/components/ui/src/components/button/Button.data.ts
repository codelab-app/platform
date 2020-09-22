import { Text } from '../text'
import { Button } from './Button.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const buttonData: NodeDtoReactI<Button.Props | Text.Props> = {
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
