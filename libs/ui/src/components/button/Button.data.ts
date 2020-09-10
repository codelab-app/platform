import { ReactNodeI } from '@codelab/shared/interface/node'
import { TextProps } from '../text/Text.types'
import { ButtonProps } from './Button.types'

export const buttonData: ReactNodeI<ButtonProps | TextProps> = {
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
