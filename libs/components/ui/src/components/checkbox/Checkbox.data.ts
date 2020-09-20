import { Text } from '../text'
import { Checkbox } from './Checkbox.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const checkboxData: NodeReactDtoI<
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
