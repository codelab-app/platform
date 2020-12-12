import { Text } from '../text'
import { Select } from './Select.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const selectData: NodeReactI<
  Select.Props | Select.OptionProps | Text.Props
> = {
  type: NodeType.React_Select,
  props: {
    style: { width: 120 },
    defaultValue: 'a',
  },
  children: [
    {
      type: NodeType.React_Select_Option,
      props: {
        value: 'a',
      },
      children: [{ type: NodeType.React_Text, props: { value: 'A' } }],
    },
    {
      type: NodeType.React_Select_Option,
      props: {
        value: 'b',
      },
      children: [{ type: NodeType.React_Text, props: { value: 'B' } }],
    },
    {
      type: NodeType.React_Select_Option,
      props: {
        value: 'c',
      },
      children: [{ type: NodeType.React_Text, props: { value: 'C' } }],
    },
  ],
}
