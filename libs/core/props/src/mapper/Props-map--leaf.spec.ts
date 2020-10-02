import { propsMapLeaf } from './Props-map--leaf'
import { Props } from '@codelab/shared/interface/props'

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
        __type: ['Leaf'],
        value: 1,
      },
      b: {
        __type: ['Leaf'],
        value: 2,
      },

      c: {
        __type: ['Leaf'],
        value: 'c',
      },
    })
  })
})
