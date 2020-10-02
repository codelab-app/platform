import { propsFilterLeaf } from './Props-filter--leaf'
import { propsFilterRenderProps } from '@codelab/core/props'
import { Props } from '@codelab/shared/interface/props'

describe('Props filter render props', () => {
  it('filters leaf & single render props', () => {
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

    const filtered = propsFilterRenderProps(props)

    expect(filtered).toStrictEqual({
      a: {
        __type: ['Leaf'],
        value: 4,
      },
      b: {
        __type: ['Single'],
        value: 2,
      },
      d: {
        __type: ['Eval', 'Leaf'],
        value: '',
      },
    })
  })
})
