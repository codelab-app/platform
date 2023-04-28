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
  const { pageRootElement: element, renderer } = setupTestForRenderer([
    LoopingRenderPipe,
  ])

  beforeEach(() => {
    element.setRenderForEachPropKey('data')
  })

  it('should add renderForEachPropKey props', () => {
    const renderOutputs = renderer.renderIntermediateElement(
      element,
      initialProps,
    ) as Array<IRenderOutput>

    const props = renderOutputs.map((output) => output.props)

    expect(props).toMatchObject([
      {
        key: `${element.id}-0`,
        prop01: 'prop01Value',
        ...initialProps,
      },
      {
        key: `${element.id}-1`,
        prop02: 'prop02Value',
        ...initialProps,
      },
      {
        key: `${element.id}-2`,
        prop03: 'prop03Value',
        ...initialProps,
      },
      {
        key: `${element.id}-3`,
        prop04: 'prop04Value',
        ...initialProps,
      },
    ])
  })
})
