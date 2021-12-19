<<<<<<< HEAD
import { extraElementPropsPipe } from './extraElementPropsPipe'
import { elementToRender, endPipe, EndPipeOutput } from './test'
=======
import { IElement } from '@codelab/shared/abstract/core'
import { extraElementPropsPipe } from './extraElementPropsPipe'
import { elementToRender } from './test'
>>>>>>> fd007128 (test: extraElementPropsPipe)
import { RenderContext } from './types'

const extraElementProps: RenderContext['extraElementProps'] = {
  [elementToRender.id]: {
    extra1: '01',
    extra2: '02',
  },
}

const defaultContext = { extraElementProps } as RenderContext
const initialProps = {}

<<<<<<< HEAD
describe('ExtraElementPropsPipe', () => {
  it('should add element extra props', () => {
    const { props } = extraElementPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual(extraElementProps[elementToRender.id])
=======
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
>>>>>>> fd007128 (test: extraElementPropsPipe)
  })
})
