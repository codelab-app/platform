import { Text } from '../text'
import { Checkbox } from './Checkbox.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const checkboxData: NodeDtoReactI<
  Checkbox.Props | Checkbox.GroupProps | Text.Props
> = {
  type: 'React.Checkbox',
  props: {
    autoFocus: false,
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: 'Checkbox',
      },
    },
  ],
}
