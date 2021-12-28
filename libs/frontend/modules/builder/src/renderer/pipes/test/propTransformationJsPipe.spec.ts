import { RenderProps } from '../../../store'
import { propTransformationJsPipe } from '../propTransformationJsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './renderData'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

const defaultContext = {} as RenderContext

const initialProps: RenderProps = {
  prop01: 'prop01Value',
  prop02: 'prop02Value',
  prop03: 'prop03Value',
}

describe('PropTransformationJsPipe', () => {
  it('should apply transformation function', () => {
    const { props } = propTransformationJsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

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

    const { props } = propTransformationJsPipe(endPipe)(
      elementWithInvalidTransformFn,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual(initialProps)
  })
})
