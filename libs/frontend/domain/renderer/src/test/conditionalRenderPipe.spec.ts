import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { ConditionalRenderPipe } from '../renderPipes/conditionalRenderPipe'
import { setupTestForRenderer } from './setup/setupTest'

describe('ConditionalRenderPipe', () => {
  const data = setupTestForRenderer([ConditionalRenderPipe])

  beforeEach(() => {
    data.elementToRender.setRenderIfExpression('{{this.shouldRender}}')
  })

  it('should render normally if no expression is set', async () => {
    data.elementToRender.setRenderIfExpression(undefined)

    const output = data.renderer.renderIntermediateElement(
      data.elementToRender,
      {},
    )

    expect(output).toEqual({
      element: data.elementToRender,
      atomType: data.elementToRender.atom?.current.type,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.elementToRender.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    data.renderer.appStore.current.state.set('shouldRender', false)

    const output = data.renderer.renderIntermediateElement(
      data.elementToRender,
      {},
    )

    expect(output).toMatchObject({
      element: data.elementToRender,
    })
  })

  it('should continue rendering', async () => {
    data.renderer.appStore.current.state.set('shouldRender', true)

    const initialProps = {
      prop01: 'prop01',
    }

    const output = data.renderer.renderIntermediateElement(
      data.elementToRender,
      initialProps,
    )

    expect(output).toEqual({
      element: data.elementToRender,
      atomType: data.elementToRender.atom?.current.type,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.elementToRender.id,
      }),
    })
  })
})
