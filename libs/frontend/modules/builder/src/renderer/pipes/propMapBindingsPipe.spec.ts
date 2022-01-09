import { RenderProps } from '../../store'
import { propMapBindingsPipe } from './propMapBindingsPipe'
import { elementToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const defaultContext = {} as RenderContext

const initialProps: RenderProps = {
  test: {
    source: {
      '01': 'random-value-01',
      '02': 'random-value-02',
      '03': 'random-value-03',
    },
  },
}

describe('PropMapBindingsPipe', () => {
  it('should add bindings to props where targetElementId is not defined', () => {
    const { props } = propMapBindingsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual({
      ...initialProps,
      testTarget01: 'random-value-01',
    })
  })

  it('should add bindings to context.extraElementProps where targetElementId is defined', () => {
    const { extraElementProps } = propMapBindingsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(extraElementProps).toStrictEqual({
      '0x2786f': {
        testTarget02: 'random-value-02',
      },
      '0x2786h': {
        testTarget03: 'random-value-03',
      },
    })
  })
})
