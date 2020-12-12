import { propsFilterLeaf } from './Props-filter--leaf'
import { PropType, Props } from '@codelab/alpha/shared/interface/props'

describe('Props filter leaf', () => {
  it('filters leaf render props', () => {
    const props: Props = {
      a: {
        __type: [PropType.Leaf],
        value: 4,
      },
      b: {
        __type: [PropType.Single],
        value: 2,
      },
      c: 0,
      d: {
        __type: [PropType.Eval, PropType.Leaf],
        value: '',
      },
    }

    const filtered = propsFilterLeaf(props)

    expect(filtered).toStrictEqual({
      a: {
        __type: [PropType.Leaf],
        value: 4,
      },
      d: {
        __type: [PropType.Eval, PropType.Leaf],
        value: '',
      },
    })
  })
})
