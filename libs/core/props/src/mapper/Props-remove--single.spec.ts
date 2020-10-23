import { propsRemoveSingle } from './Props-remove--single'
import { PropType, Props } from '@codelab/shared/interface/props'

describe('Props Transform Single', () => {
  it('turns a single renderProps into regular prop', () => {
    const props: Props = {
      a: {
        __type: [PropType.Single],
        value: 3,
      },
      b: {
        __type: [PropType.Leaf, PropType.Eval],
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
        __type: [PropType.Leaf, PropType.Eval],
        value: '',
      },
    })
  })
})
