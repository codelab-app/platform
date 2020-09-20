import { Text } from '../text'
import { Radio } from './Radio.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const radioData: NodeReactDtoI<
  Radio.Props | Radio.GroupProps | Text.Props
> = {
  type: 'React.Provider',
  props: {
    ctx: {
      eval: true,
      value:
        'const [value, setValue] = this.React.useState("a"); return { value, setValue }',
    },
    onChange: {
      eval: true,
      value: 'return (e) => this.setValue(e.target.value)',
    },
    value: {
      eval: true,
      value: 'return this.value',
    },
  },
  children: [
    {
      type: 'React.Radio.Group',
      children: [
        {
          type: 'React.Radio',
          props: { value: 'a' },
          children: [{ type: 'React.Text', props: { value: 'A' } }],
        },
        {
          type: 'React.Radio',
          props: { value: 'b' },
          children: [{ type: 'React.Text', props: { value: 'B' } }],
        },
        {
          type: 'React.Radio',
          props: { value: 'c' },
          children: [{ type: 'React.Text', props: { value: 'C' } }],
        },
        {
          type: 'React.Radio',
          props: { value: 'd' },
          children: [{ type: 'React.Text', props: { value: 'D' } }],
        },
      ],
    },
  ],
}
