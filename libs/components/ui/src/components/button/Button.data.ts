import { Text } from '../text'
import { Button } from './Button.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const buttonData: NodeDtoI<Button.Props | Text.Props> = {
  type: 'React.Button',
  props: {
    type: 'React.primary',
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
