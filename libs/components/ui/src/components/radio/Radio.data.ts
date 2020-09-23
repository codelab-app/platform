import { Text } from '../text'
import { Radio } from './Radio.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const radioData: NodeReactI<
  Radio.Props | Radio.GroupProps | Text.Props
> = {
  type: 'React.Radio.Group',
  props: {
    ctx: {
      __type: 'eval',
      value:
        'const [value, setValue] = this.React.useState("a"); return { value, setValue }',
    },
    onChange: {
      __type: 'eval',
      value: 'return (e) => this.setValue(e.target.value)',
    },
    value: {
      __type: 'eval',
      value: 'return this.value',
    },
  },
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
}
