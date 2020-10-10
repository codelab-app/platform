import { Text } from '../text'
import { Radio } from './Radio.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const radioData: NodeReactI<
  Radio.Props | Radio.GroupProps | Text.Props
> = {
  type: 'React.Fragment',
  props: {
    ctx: {
      __type: ['Eval', 'Leaf'],
      value: `
        const [value, setValue] = this.React.useState("a"); 
        
        return { value, setValue }
      `,
    },
  },
  children: [
    {
      type: 'React.Radio.Group',
      props: {
        onChange: {
          __type: ['Eval'],
          value: 'return (e) => this.ctx.setValue(e.target.value)',
        },
        value: {
          __type: ['Eval'],
          value: 'return this.ctx.value',
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
    },
  ],
}
