import { propsPipeline } from '../renderPipeline'
import { RenderContext } from '../types'
import { elementToRender } from './renderData'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

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
