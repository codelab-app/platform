import { propsPipeline } from './renderPipeline'
import { elementToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const defaultContext = {} as RenderContext
const initialProps = {}

describe('PropsPipe', () => {
  it('should add props with type', () => {
    const { props } = propsPipeline(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual({
      __node: elementToRender,
      nodeid: elementToRender.id,
      key: elementToRender.id,
      prop01: 'prop01Value',
      prop02: 'prop02Value',
      prop03: 'prop03Value',
    })
  })
})
