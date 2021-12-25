import { IElement } from '@codelab/shared/abstract/core'
import { RenderProps } from '../../../store'
import { propTransformationJsPipe } from '../propTransformationJsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './renderData'

const defaultContext = {} as RenderContext

const initialProps: RenderProps = {
  prop01: 'prop01Value',
  prop02: 'prop02Value',
  prop03: 'prop03Value',
}

const restfulPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('PropTransformationJsPipe', () => {
  it('should apply transformation function', () => {
    const restful = propTransformationJsPipe(restfulPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual({
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

    const restful = propTransformationJsPipe(restfulPipe)(
      elementWithInvalidTransformFn,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual(initialProps)
  })
})
