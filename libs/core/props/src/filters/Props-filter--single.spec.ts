import { propsFilterSingle } from '@codelab/core/props'
import { Props } from '@codelab/shared/interface/props'

describe('Props filter single', () => {
  it('filters single render props', () => {
    const props: Props = {
      a: {
        __type: ['Leaf'],
        value: 4,
      },
      b: {
        __type: ['Single'],
        value: 2,
      },
      c: 0,
      d: {
        __type: ['Eval', 'Leaf'],
        value: '',
      },
    }

    const filtered = propsFilterSingle(props)

    expect(filtered).toStrictEqual({
      b: {
        __type: ['Single'],
        value: 2,
      },
    })
  })
})
