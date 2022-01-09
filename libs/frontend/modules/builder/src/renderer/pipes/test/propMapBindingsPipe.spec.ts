import { RenderPipelineProps } from '../../../store'
import { propMapBindingsPipe } from '../propMapBindingsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

const defaultContext = {} as RenderContext

const initialProps: RenderPipelineProps = {
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
    const { props } = propMapBindingsPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual({
      ...initialProps,
      testTarget01: 'random-value-01',
    })
  })

  it('should add bindings to context.extraElementProps where targetElementId is defined', () => {
    const { extraElementProps } = propMapBindingsPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

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
