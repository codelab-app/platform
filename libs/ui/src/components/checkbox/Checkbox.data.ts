import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.data'
import { CheckboxGroupProps, CheckBoxProps } from './Checkbox.types'

export const checkboxData: ReactNodeI<
  CheckBoxProps | CheckboxGroupProps | TextProps
> = {
  type: 'Checkbox',
  nodeType: 'React',
  props: {
    autoFocus: false,
    value: 'Checkbox',
  },
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value: 'Checkbox',
      },
    },
  ],
}
