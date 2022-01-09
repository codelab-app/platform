import { IElement } from '@codelab/shared/abstract/core'
import { extraElementPropsPipe } from '../extraElementPropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'

const extraElementProps: RenderContext['extraElementProps'] = {
  [elementToRender.id]: {
    extra1: '01',
    extra2: '02',
  },
}

const defaultContext = { extraElementProps } as RenderContext
const initialProps = {}

const restfulPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('ExtraElementPropsPipe', () => {
  it('should add element extra props', () => {
    const restful = extraElementPropsPipe(restfulPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual(extraElementProps[elementToRender.id])
  })
})
