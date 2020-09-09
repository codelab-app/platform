import React from 'react'
import { render } from '@testing-library/react'
import {
  evalPropsWithContext,
  evalPropValue,
  evalPropsIterator,
} from './Props-eval'
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
    const { onSuccess, onError } = evalPropsIterator(props)

    expect((onSuccess as Function)()).toBeTruthy()
    expect((onError as Function)()).toBeFalsy()
  })

  it('can access context', () => {
    const { onPending } = evalPropsIterator(props, { status: 'pending' })

    expect((onPending as Function)()).toBe('pending')
  })

  describe('evalPropsWithContext', () => {
    // Same as above, but tests as integration test
    const reactProps = {
      icon: {
        type: 'Icon',
        nodeType: 'React',
        props: {
          type: 'mail',
          theme: 'outlined',
        },
      },
    }

    it('evals for evalProps', () => {
      const { onSuccess, onError } = evalPropsWithContext(props)

      expect((onSuccess as Function)()).toBeTruthy()
      expect((onError as Function)()).toBeFalsy()
    })

    it('evals for reactProps', () => {
      const TreeDom = {
        render: jest.fn().mockReturnValue(() => null),
      }
      const renderReactNodesSpy = jest.spyOn(propsReact, 'renderReactNodes')
      const { icon } = evalPropsWithContext({ ...reactProps, ctx: { TreeDom } })

      expect(icon).toBeDefined()
      expect(renderReactNodesSpy).toHaveBeenCalled()
    })
    it('should throw an error when missing TreeDom ctx', () => {
      expect(() => evalPropsWithContext({ ...reactProps })).toThrowError()
    })
  })
})
