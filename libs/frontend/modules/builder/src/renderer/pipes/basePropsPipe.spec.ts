import { basePropsPipe } from './basePropsPipe'
import { elementToRender } from './test'
import { RenderContext } from './types'

describe('BasePropsPipe', () => {
  it('should add base props', () => {
    const restful = basePropsPipe((element, context, props) => props)(
      elementToRender,
      {} as RenderContext,
      {},
    )

    expect(restful).toStrictEqual({
      nodeid: elementToRender.id,
      __node: elementToRender,
      key: elementToRender.id,
    })
  })
})
