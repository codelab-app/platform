import { ReactNodeI } from '@codelab/shared/interface/node'
import { Checkbox } from './Checkbox.types'
import { Text } from '../text'

export const checkboxData: ReactNodeI<
  Checkbox.Props | Checkbox.GroupProps | Text.Props
> = {
  type: 'Checkbox',
  nodeType: 'React',
  props: {
    autoFocus: false,
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
