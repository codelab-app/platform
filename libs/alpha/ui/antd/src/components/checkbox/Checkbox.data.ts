import { Text } from '../text'
import { Checkbox } from './Checkbox.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const checkboxData: NodeReactI<
  Checkbox.Props | Checkbox.GroupProps | Text.Props
> = {
  type: NodeType.React_Checkbox,
  props: {
    autoFocus: false,
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Checkbox',
      },
    },
  ],
}
