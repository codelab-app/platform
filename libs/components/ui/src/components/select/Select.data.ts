import { ReactNodeI } from '@codelab/shared/interface/node'
import { Select } from './Select.types'
import { Text } from '../text'

export const selectData: ReactNodeI<
  Select.Props | Select.OptionProps | Text.Props
> = {
  type: 'Select',
  nodeType: 'React',
  props: {
    style: { width: 120 },
    defaultValue: 'a',
  },
  children: [
    {
      nodeType: 'React',
      type: 'Select.Option',
      props: {
        value: 'a',
      },
      children: [{ type: 'Text', nodeType: 'React', props: { value: 'A' } }],
    },
    {
      nodeType: 'React',
      type: 'Select.Option',
      props: {
        value: 'b',
      },
      children: [{ type: 'Text', nodeType: 'React', props: { value: 'B' } }],
    },
    {
      nodeType: 'React',
      type: 'Select.Option',
      props: {
        value: 'c',
      },
      children: [{ type: 'Text', nodeType: 'React', props: { value: 'C' } }],
    },
  ],
}
