import { buildProps, evalPropValue, evalPropsFactory } from './Props-eval'
import { propsIterator } from './Props-iterator'
import * as propsReact from './Props-react'

describe('Props with eval type', () => {
  const props = {
    onSuccess: {
      eval: true,
      value: 'return () => true',
    },
    onError: {
      eval: true,
      value: 'return () => false',
    },
    onPending: {
      eval: true,
      value: 'return () => this.status',
    },
  }

  it('evaluates a prop value', () => {
    const onSuccess = evalPropValue(props.onSuccess)
    const onError = evalPropValue(props.onError)

    expect(onSuccess()).toBeTruthy()
    expect(onError()).toBeFalsy()
  })

  it('evaluates a props object', () => {
    const { onSuccess, onError } = propsIterator(props, evalPropsFactory)

    expect((onSuccess as Function)()).toBeTruthy()
    expect((onError as Function)()).toBeFalsy()
  })

  describe('buildProps', () => {
    // Same as above, but tests as integration test
    const reactProps = {
      icon: {
        type: 'React.Icon',
        props: {
          type: 'mail',
          theme: 'outlined',
        },
      },
    }

    it('evals for evalProps', () => {
      const { onSuccess, onError } = buildProps(props, {})

      expect((onSuccess as Function)()).toBeTruthy()
      expect((onError as Function)()).toBeFalsy()
    })

    it('evals for reactProps', () => {
      const TreeDom = {
        render: jest.fn().mockReturnValue(() => null),
      }
      const renderReactNodesSpy = jest.spyOn(propsReact, 'renderReactNodes')
      const { icon } = buildProps({ ...reactProps, ctx: { TreeDom } }, {})

      expect(icon).toBeDefined()
      expect(renderReactNodesSpy).toHaveBeenCalled()
    })
  })
})
