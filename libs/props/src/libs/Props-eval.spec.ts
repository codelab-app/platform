import { evalPropValue, evalPropsIterator } from './Props-eval'

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
    const { onSuccess, onError } = evalPropsIterator(props)

    expect((onSuccess as Function)()).toBeTruthy()
    expect((onError as Function)()).toBeFalsy()
  })

  it('can access context', () => {
    const { onPending } = evalPropsIterator(props, { status: 'pending' })

    expect((onPending as Function)()).toBe('pending')
  })
})
