import { DATA_ID } from '@codelab/frontend/abstract/core'
import { ConditionalRenderPipe } from '../renderPipes/ConditionalRenderPipe'
import { setupTestRenderData } from './testData/renderData'

describe('ConditionalRenderPipe', () => {
  const data = setupTestRenderData(
    (next) => new ConditionalRenderPipe({ next }),
  )

  beforeEach(() => {
    data.elementToRender.setRenderIfPropKey('shouldRender')
  })

  it('should render normally if no key is found', async () => {
    data.elementToRender.setRenderIfPropKey(null)

    const output = data.renderService.renderElementIntermediate(
      data.elementToRender,
      {
        shouldRender: false,
      },
    )

    expect(output).toEqual({
      elementId: data.elementToRender.id,
      atomType: data.elementToRender.atom?.current.type,
      props: expect.objectContaining({
        [DATA_ID]: data.elementToRender.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    const output = data.renderService.renderElementIntermediate(
      data.elementToRender,
      {
        shouldRender: false,
      },
    )

    expect(output).toMatchObject({
      elementId: data.elementToRender.id,
    })
  })

  it('should continue rendering', async () => {
    const initialProps = {
      shouldRender: true,
      prop01: 'prop01',
    }

    const output = data.renderService.renderElementIntermediate(
      data.elementToRender,
      initialProps,
    )

    expect(output).toEqual({
      elementId: data.elementToRender.id,
      atomType: data.elementToRender.atom?.current.type,
      props: expect.objectContaining({
        [DATA_ID]: data.elementToRender.id,
      }),
    })
  })
})
