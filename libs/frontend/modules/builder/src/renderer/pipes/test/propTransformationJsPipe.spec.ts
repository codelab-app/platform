import { IElement } from '@codelab/shared/abstract/core'
import { RenderPipelineProps } from '../../../store'
import { propTransformationJsPipe } from '../propTransformationJsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

const defaultContext = {} as RenderContext

const initialProps: RenderPipelineProps = {
  prop01: 'prop01Value',
  prop02: 'prop02Value',
  prop03: 'prop03Value',
}

describe('PropTransformationJsPipe', () => {
  it('should apply transformation function', () => {
    const { props } = propTransformationJsPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual({
      ...initialProps,
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should keep same props when transform function is invalid', () => {
    const elementWithInvalidTransformFn = {
      ...elementToRender,
      propTransformationJs: 'invalid function',
    }

    const { props } = propTransformationJsPipe(resultPipe)(
      elementWithInvalidTransformFn,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual(initialProps)
  })
})
