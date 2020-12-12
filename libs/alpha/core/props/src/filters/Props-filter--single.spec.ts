import { propsFilterSingle } from './Props-filter--single'
import { PropType, Props } from '@codelab/alpha/shared/interface/props'

describe('Props filter single', () => {
  it('filters single render props', () => {
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

    const filtered = propsFilterSingle(props)

    expect(filtered).toStrictEqual({
      b: {
        __type: [PropType.Single],
        value: 2,
      },
    })
  })
})
