import { pipe } from 'ramda'
import { propsFactoryEval } from './factories'
import { propsFilterRenderProps } from './filters'
import { propsRemoveSingle } from './mapper'
import { PropType, Props } from '@codelab/shared/interface/props'

describe('Props', () => {
  const parent: Props = {
    data_eval_leaf: {
      __type: [PropType.Eval, PropType.Leaf],
      value: 'return { a: 1, b: 2 }',
    },
    data_eval_single: {
      __type: [PropType.Eval, PropType.Single],
      value: 'return { c: 0 }',
    },
    data_leaf: {
      __type: [PropType.Leaf],
      value: 3,
    },
    data_single: {
      __type: [PropType.Single],
      value: 0,
    },
    data_default: 4,
  }

  const current: Props = {
    log: {
      __type: [PropType.Eval],
      value: 'return () => this.data_eval_leaf.a',
    },
  }

  it('filters render props', () => {
    const props = pipe(propsFilterRenderProps)(parent)

    expect(props).toStrictEqual({
      data_eval_leaf: {
        __type: [PropType.Eval, PropType.Leaf],
        value: 'return { a: 1, b: 2 }',
      },
      data_eval_single: {
        __type: [PropType.Eval, PropType.Single],
        value: 'return { c: 0 }',
      },
      data_leaf: {
        __type: [PropType.Leaf],
        value: 3,
      },
      data_single: {
        __type: [PropType.Single],
        value: 0,
      },
    })
  })

  it('removes single render props', () => {
    const props = pipe(propsRemoveSingle)(parent)

    expect(props).toStrictEqual({
      data_eval_leaf: {
        __type: [PropType.Eval, PropType.Leaf],
        value: 'return { a: 1, b: 2 }',
      },
      data_eval_single: {
        __type: [PropType.Eval],
        value: 'return { c: 0 }',
      },
      data_leaf: {
        __type: [PropType.Leaf],
        value: 3,
      },
      data_single: {
        __type: [],
        value: 0,
      },
      data_default: 4,
    })
  })

  describe('Evaluate Props', () => {
    const parentProps = pipe(propsFactoryEval())(parent)

    it('evaluates props', () => {
      expect(parentProps).toStrictEqual({
        data_eval_leaf: {
          __type: [PropType.Leaf],
          value: { a: 1, b: 2 },
        },
        data_eval_single: {
          __type: [PropType.Single],
          value: { c: 0 },
        },
        data_leaf: {
          __type: [PropType.Leaf],
          value: 3,
        },
        data_single: {
          __type: [PropType.Single],
          value: 0,
        },
        data_default: 4,
      })
    })

    it('evaluates props with renderProps as context', () => {
      const props = pipe(propsFactoryEval(parentProps))(current)

      expect((props?.log as any).value()).toBe(1)
    })
  })
})
