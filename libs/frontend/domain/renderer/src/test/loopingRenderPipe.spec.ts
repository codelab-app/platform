import type { IRenderOutput } from '@codelab/frontend/abstract/core'
import { LoopingRenderPipe } from '../renderPipes/loopingRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

const initialProps = {
  data: [
    { prop01: 'prop01Value' },
    { prop02: 'prop02Value' },
    { prop03: 'prop03Value' },
    { prop04: 'prop04Value' },
  ],
}

describe('LoopingRenderPipe.', () => {
  const data = setupTestForRenderer([LoopingRenderPipe])

  beforeEach(() => {
    data.pageRootElement.setRenderForEachPropKey('data')
  })

  it('should add renderForEachPropKey props', () => {
    const renderOutputs = data.renderer.renderIntermediateElement(
      data.pageRootElement,
      initialProps,
    ) as Array<IRenderOutput>

    const props = renderOutputs.map((output) => output.props)

    expect(props).toMatchObject([
      {
        key: `${data.pageRootElement.id}-0`,
        prop01: 'prop01Value',
        ...initialProps,
      },
      {
        key: `${data.pageRootElement.id}-1`,
        prop02: 'prop02Value',
        ...initialProps,
      },
      {
        key: `${data.pageRootElement.id}-2`,
        prop03: 'prop03Value',
        ...initialProps,
      },
      {
        key: `${data.pageRootElement.id}-3`,
        prop04: 'prop04Value',
        ...initialProps,
      },
    ])
  })
})
