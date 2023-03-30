import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { ConditionalRenderPipe } from '../renderPipes/conditionalRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('ConditionalRenderPipe', () => {
  const data = setupTestForRenderer([ConditionalRenderPipe])

  beforeEach(() => {
    data.elementToRender.setRenderIfExpression('{{this.shouldRender}}')
  })

  it('should render normally if no expression is set', async () => {
    data.elementToRender.setRenderIfExpression(undefined)

    const output = data.rootStore.renderer.renderIntermediateElement(
      data.elementToRender,
      {},
    )

    const atomType = isAtomInstance(data.elementToRender.renderType)
      ? data.elementToRender.renderType.current.type
      : null

    expect(output).toEqual({
      atomType,
      element: data.elementToRender,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.elementToRender.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    data.store.state.set('shouldRender', false)

    const output = data.rootStore.renderer.renderIntermediateElement(
      data.elementToRender,
      {},
    )

    expect(output).toMatchObject({
      element: data.elementToRender,
    })
  })

  it('should continue rendering', async () => {
    data.store.state.set('shouldRender', true)

    const initialProps = {
      prop01: 'prop01',
    }

    const output = data.rootStore.renderer.renderIntermediateElement(
      data.elementToRender,
      initialProps,
    )

    const atomType = isAtomInstance(data.elementToRender.renderType)
      ? data.elementToRender.renderType.current.type
      : null

    expect(output).toEqual({
      atomType,
      element: data.elementToRender,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.elementToRender.id,
      }),
    })
  })
})
