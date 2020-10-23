import { propsFilterRenderProps } from '@codelab/core/props'
import { PropType, Props } from '@codelab/shared/interface/props'

describe('Props filter render props', () => {
  it('filters leaf & single render props', () => {
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

    const filtered = propsFilterRenderProps(props)

    expect(filtered).toStrictEqual({
      a: {
        __type: [PropType.Leaf],
        value: 4,
      },
      b: {
        __type: [PropType.Single],
        value: 2,
      },
      d: {
        __type: [PropType.Eval, PropType.Leaf],
        value: '',
      },
    })
  })
})
