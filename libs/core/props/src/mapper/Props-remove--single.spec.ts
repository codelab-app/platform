import { propsRemoveSingle } from './Props-remove--single'
import { propsIterator } from '@codelab/core/props'
import { Props } from '@codelab/shared/interface/props'

describe('Props Transform Single', () => {
  it('turns a single renderProps into regular prop', () => {
    const props: Props = {
      a: {
        __type: ['Single'],
        value: 3,
      },
      b: {
        __type: ['Leaf', 'Eval'],
        value: '',
      },
    }

    const newProps = propsRemoveSingle(props)

    expect(newProps).toStrictEqual({
      a: {
        __type: [],
        value: 3,
      },
      b: {
        __type: ['Leaf', 'Eval'],
        value: '',
      },
    })
  })
})
