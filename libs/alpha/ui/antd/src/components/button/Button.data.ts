import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const buttonData: NodeI = {
  type: AtomType.ReactButton,
  props: {
    type: 'primary',
  },
  children: [
    {
      type: AtomType.ReactText,
      props: {
        value: 'Click me',
      },
    },
  ],
}

export const buttonEvalData: NodeI = {
  type: AtomType.ReactButton,
  props: {
    onClick: {
      __type: [PropType.Eval],
      value: `return () => console.log(this.ctx.a)`,
    },
    type: 'primary',
  },
  children: [
    {
      type: AtomType.ReactText,
      props: {
        value: 'Click me',
      },
    },
  ],
}
