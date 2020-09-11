import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Button } from './Button.types'

export const buttonData: ReactNodeI<Button.Props | Text.Props> = {
  type: 'Button',
  nodeType: 'React',
  props: {
    type: 'primary',
  },
  children: [
    {
      nodeType: 'React',
      type: 'Text',
      props: {
        value: 'Click me',
      },
    },
  ],
}
