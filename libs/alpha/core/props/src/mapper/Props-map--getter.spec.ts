import { propsMapGetter } from './Props-map--getter'
import { PropType, Props } from '@codelab/alpha/shared/interface/props'

describe('Props Map Getter', () => {
  it('maps all props to a getter style', () => {
    const props: Props = {
      a: {
        __type: [PropType.Eval],
        value: 'return { a: 1, b: 2 }',
      },
      b: {
        __type: [PropType.Leaf],
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
