import { ElementTree } from '@codelab/shared/core'
import { conditionalRenderPipe } from './conditionalRenderPipe'
import { renderPipeline } from './renderPipeline'
import { elementGraph, elementToRender, endPipe, EndPipeOutput } from './test'
import { RenderContext } from './types'

const tree = new ElementTree(elementGraph)

const defaultContext = {
  tree,
  render: renderPipeline,
} as RenderContext

describe('ConditionalRenderPipe', () => {
  it('should stop rendering by returning null', async () => {
    const output = conditionalRenderPipe(endPipe)(
      elementToRender,
      defaultContext,
      {
        shouldRender: false,
        prop01: 'prop01',
      },
    ) as EndPipeOutput

    expect(output).toBeNull()
  })

  it('should continue rendering', async () => {
    const initialProps = {
      shouldRender: true,
      prop01: 'prop01',
    }

    const { props } = conditionalRenderPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    expect(props).toStrictEqual(initialProps)
  })
})
