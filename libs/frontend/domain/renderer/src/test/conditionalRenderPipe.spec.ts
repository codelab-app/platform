import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { ConditionalRenderPipe } from '../renderPipes/conditionalRenderPipe'
import { setupTestForRenderer } from './setup/setupTest'

describe('ConditionalRenderPipe', () => {
  const data = setupTestForRenderer([ConditionalRenderPipe])

  beforeEach(() => {
    data.elementToRender.setRenderIfExpression('{{this.shouldRender}}')
  })

  it('should render normally if no key is found', async () => {
    data.elementToRender.setRenderIfExpression(undefined)

    const output = data.renderer.renderIntermediateElement(
      data.elementToRender,
      {
        shouldRender: false,
      },
    )

    expect(output).toEqual({
      elementId: data.elementToRender.id,
      atomType: data.elementToRender.atom?.current.type,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.elementToRender.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    const output = data.renderer.renderIntermediateElement(
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

    const output = data.renderer.renderIntermediateElement(
      data.elementToRender,
      initialProps,
    )

    expect(output).toEqual({
      elementId: data.elementToRender.id,
      atomType: data.elementToRender.atom?.current.type,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.elementToRender.id,
      }),
    })
  })
})
