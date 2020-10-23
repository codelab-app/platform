import { propsMapLeaf } from './Props-map--leaf'
import { PropType, Props } from '@codelab/shared/interface/props'

describe('Props Map Leaf', () => {
  it('maps all props to a Leaf prop type', () => {
    const props: Props = {
      a: 1,
      b: 2,
      c: 'c',
    }

    const leafProps = propsMapLeaf(props)

    expect(leafProps).toStrictEqual({
      a: {
        __type: [PropType.Leaf],
        value: 1,
      },
      b: {
        __type: [PropType.Leaf],
        value: 2,
      },

      c: {
        __type: [PropType.Leaf],
        value: 'c',
      },
    })
  })
})
