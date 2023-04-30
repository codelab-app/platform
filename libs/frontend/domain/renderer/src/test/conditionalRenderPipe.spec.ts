import {
  DATA_ELEMENT_ID,
  isAtomInstance,
} from '@codelab/frontend/abstract/core'
import { ConditionalRenderPipe } from '../renderPipes/conditionalRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('ConditionalRenderPipe', () => {
  const data = setupTestForRenderer([ConditionalRenderPipe])

  beforeEach(() => {
    data.pageRootElement.setRenderIfExpression('{{this.shouldRender}}')
  })

  it('should render normally if no expression is set', async () => {
    data.pageRootElement.setRenderIfExpression(undefined)

    const output = data.renderer.renderIntermediateElement(
      data.pageRootElement,
      {},
    )

    const atomType = isAtomInstance(data.pageRootElement.renderType)
      ? data.pageRootElement.renderType.current.type
      : null

    expect(output).toEqual({
      atomType,
      element: data.pageRootElement,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.pageRootElement.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    data.pageRootElement.store.current.setInitialState({ shouldRender: false })

    const output = data.renderer.renderIntermediateElement(
      data.pageRootElement,
      {},
    )

    expect(output).toMatchObject({ element: data.pageRootElement })
  })

  it('should continue rendering', async () => {
    data.pageRootElement.store.current.setInitialState({
      shouldRender: false,
    })

    const initialProps = {
      prop01: 'prop01',
    }

    const output = data.renderer.renderIntermediateElement(
      data.pageRootElement,
      initialProps,
    )

    const atomType = isAtomInstance(data.pageRootElement.renderType)
      ? data.pageRootElement.renderType.current.type
      : null

    expect(output).toEqual({
      atomType,
      element: data.pageRootElement,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.pageRootElement.id,
      }),
    })
  })
})
