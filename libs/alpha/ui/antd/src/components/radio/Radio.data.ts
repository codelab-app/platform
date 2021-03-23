import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const radioData: NodeI = {
  type: AtomType.ReactFragment,
  props: {
    ctx: {
      __type: [PropType.Eval, PropType.Leaf],
      value: `
        const [value, setValue] = this.React.useState("a");

        return { value, setValue }
      `,
    },
  },
  children: [
    {
      type: AtomType.ReactRadioGroup,
      props: {
        onChange: {
          __type: [PropType.Eval],
          value: 'return (e) => this.ctx.setValue(e.target.value)',
        },
        value: {
          __type: [PropType.Eval],
          value: 'return this.ctx.value',
        },
      },
      children: [
        {
          type: AtomType.ReactRadio,
          props: { value: 'a' },
          children: [{ type: AtomType.ReactText, props: { value: 'A' } }],
        },
        {
          type: AtomType.ReactRadio,
          props: { value: 'b' },
          children: [{ type: AtomType.ReactText, props: { value: 'B' } }],
        },
        {
          type: AtomType.ReactRadio,
          props: { value: 'c' },
          children: [{ type: AtomType.ReactText, props: { value: 'C' } }],
        },
        {
          type: AtomType.ReactRadio,
          props: { value: 'd' },
          children: [{ type: AtomType.ReactText, props: { value: 'D' } }],
        },
      ],
    },
  ],
}
