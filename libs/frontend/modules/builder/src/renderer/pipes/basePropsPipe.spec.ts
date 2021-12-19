import { IElement } from '@codelab/shared/abstract/core'
import { basePropsPipe } from './basePropsPipe'
import { elementToRender } from './test'
import { RenderContext } from './types'

const defaultContext = {} as RenderContext
const initialProps = {}

const restfulPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
) => props

describe('BasePropsPipe', () => {
  it('should add base props', () => {
    const restful = basePropsPipe(restfulPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    )

    expect(restful).toStrictEqual({
      nodeid: elementToRender.id,
      __node: elementToRender,
      key: elementToRender.id,
    })
  })
})
