import { propsMapLeaf } from './Props-map--leaf'
import { propsMapGetter } from '@codelab/core/props'
import { Props } from '@codelab/shared/interface/props'

describe('Props Map Getter', () => {
  it('maps all props to a getter style', () => {
    const props: Props = {
      a: {
        __type: ['Eval'],
        value: 'return { a: 1, b: 2 }',
      },
      b: {
        __type: ['Leaf'],
        value: 4,
      },
      c: 'c',
    }

    const getterProps = propsMapGetter(props)

    /**
     * All __type is stripped even though they haven't been evaluated, you normally would call other transformation functions before calling getter.
     */
    expect(getterProps).toStrictEqual({
      a: 'return { a: 1, b: 2 }',
      b: 4,
      c: 'c',
    })
  })
})
