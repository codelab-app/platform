import { propsFilterLeaf } from './Props-filter--leaf'
import { Props } from '@codelab/shared/interface/props'

describe('Props filter leaf', () => {
  it('filters leaf render props', () => {
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

    const filtered = propsFilterLeaf(props)

    expect(filtered).toStrictEqual({
      a: {
        __type: ['Leaf'],
        value: 4,
      },
      d: {
        __type: ['Eval', 'Leaf'],
        value: '',
      },
    })
  })
})
