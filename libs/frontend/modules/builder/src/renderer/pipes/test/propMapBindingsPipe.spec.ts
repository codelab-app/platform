import { IElement } from '@codelab/shared/abstract/core'
import { RenderPipelineProps } from '../../../store'
import { propMapBindingsPipe } from '../propMapBindingsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'

const defaultContext = {} as RenderContext

type ResultPipeOutput = {
  props: RenderPipelineProps
  extraElementProps?: RenderPipelineProps
}

const initialProps: RenderPipelineProps = {
  test: {
    source: {
      '01': 'random-value-01',
      '02': 'random-value-02',
      '03': 'random-value-03',
    },
  },
}

const resultPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
): ResultPipeOutput => {
  const { extraElementProps } = context

  return {
    props,
    extraElementProps,
  }
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
