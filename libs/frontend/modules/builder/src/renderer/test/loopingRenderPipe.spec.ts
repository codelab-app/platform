import { IRenderOutput } from '@codelab/shared/abstract/core'
import { LoopingRenderPipe } from '../renderPipes/loopingRenderPipe'
import { setupTestForRenderer } from './setup/setupTest'

const initialProps = {
  data: [
    { prop01: 'prop01Value' },
    { prop02: 'prop02Value' },
    { prop03: 'prop03Value' },
    { prop04: 'prop04Value' },
  ],
}

describe('LoopingRenderPipe', () => {
  const data = setupTestForRenderer([LoopingRenderPipe])

  beforeEach(() => {
    data.elementToRender.setRenderForEachPropKey('data')
  })

  it('should add renderForEachPropKey props', () => {
    const output = data.renderService.renderIntermediateElement(
      data.elementToRender,
      initialProps,
    ) as Array<IRenderOutput>

    const props = output.map((x) => x.props)

    expect(props).toMatchObject([
      {
        key: `${data.elementToRender.id}-0`,
        prop01: 'prop01Value',
        ...initialProps,
      },
      {
        key: `${data.elementToRender.id}-1`,
        prop02: 'prop02Value',
        ...initialProps,
      },
      {
        key: `${data.elementToRender.id}-2`,
        prop03: 'prop03Value',
        ...initialProps,
      },
      {
        key: `${data.elementToRender.id}-3`,
        prop04: 'prop04Value',
        ...initialProps,
      },
    ])
  })
})
