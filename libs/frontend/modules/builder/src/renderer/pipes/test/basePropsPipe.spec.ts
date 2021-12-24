import { basePropsPipe } from '../basePropsPipe'
import { RenderContext } from '../types'
import { elementToRender } from './data'
import { ResultPipeOutput } from './types'
import { resultPipe } from './utils'

const defaultContext = {} as RenderContext
const initialProps = {}

describe('BasePropsPipe', () => {
  it('should add base props', () => {
    const { props } = basePropsPipe(resultPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as ResultPipeOutput

    expect(props).toStrictEqual({
      nodeid: elementToRender.id,
      __node: elementToRender,
      key: elementToRender.id,
    })
  })
})
