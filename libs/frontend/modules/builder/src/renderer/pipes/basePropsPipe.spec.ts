import { basePropsPipe } from './basePropsPipe'
import { elementToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const defaultContext = {} as RenderContext
const initialProps = {}

describe('BasePropsPipe', () => {
  it('should add base props', () => {
    const { props } = basePropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual({
      nodeid: elementToRender.id,
      __node: elementToRender,
      key: elementToRender.id,
    })
  })
})
