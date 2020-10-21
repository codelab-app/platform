import { Text } from '../text'
import { Radio } from './Radio.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const radioData: NodeReactI<
  Radio.Props | Radio.GroupProps | Text.Props
> = {
  type: NodeType.React_Fragment,
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
      type: NodeType.React_Radio_Group,
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
          type: NodeType.React_Radio,
          props: { value: 'a' },
          children: [{ type: NodeType.React_Text, props: { value: 'A' } }],
        },
        {
          type: NodeType.React_Radio,
          props: { value: 'b' },
          children: [{ type: NodeType.React_Text, props: { value: 'B' } }],
        },
        {
          type: NodeType.React_Radio,
          props: { value: 'c' },
          children: [{ type: NodeType.React_Text, props: { value: 'C' } }],
        },
        {
          type: NodeType.React_Radio,
          props: { value: 'd' },
          children: [{ type: NodeType.React_Text, props: { value: 'D' } }],
        },
      ],
    },
  ],
}
