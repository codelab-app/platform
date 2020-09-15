import { Text } from '../text'
import { Select } from './Select.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const selectData: NodeDtoI<
  Select.Props | Select.OptionProps | Text.Props
> = {
  type: 'React.Select',
  props: {
    style: { width: 120 },
    defaultValue: 'a',
  },
  children: [
    {
      type: 'React.Select.Option',
      props: {
        value: 'a',
      },
      children: [{ type: 'React.Text', props: { value: 'A' } }],
    },
    {
      type: 'React.Select.Option',
      props: {
        value: 'b',
      },
      children: [{ type: 'React.Text', props: { value: 'B' } }],
    },
    {
      type: 'React.Select.Option',
      props: {
        value: 'c',
      },
      children: [{ type: 'React.Text', props: { value: 'C' } }],
    },
  ],
}
