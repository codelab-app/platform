import { basePropsPipe } from '../basePropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './renderData'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

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
