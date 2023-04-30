import {
  DATA_ELEMENT_ID,
  isAtomInstance,
} from '@codelab/frontend/abstract/core'
import { AtomRenderPipe } from '../renderPipes/atomRenderPipe'
import { ConditionalRenderPipe } from '../renderPipes/conditionalRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('ConditionalRenderPipe', () => {
  const data = setupTestForRenderer([AtomRenderPipe, ConditionalRenderPipe])

  beforeEach(() => {
    data.element.setRenderIfExpression('{{this.shouldRender}}')
  })

  it('should render normally if no expression is set', async () => {
    data.element.setRenderIfExpression(undefined)

    const output = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      {},
    )

    const atomType = isAtomInstance(data.element.renderType)
      ? data.element.renderType.current.type
      : null

    expect(output).toMatchObject({
      atomType,
      element: data.element,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.element.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    data.element.store.current.setInitialState({ shouldRender: false })

    const output = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      {},
    )

    expect(output).toMatchObject({
      element: data.element,
    })
  })

  it('should continue rendering', async () => {
    data.element.store.current.setInitialState({ shouldRender: true })

    const initialProps = {
      prop01: 'prop01',
    }

    const output = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      initialProps,
    )

    const atomType = isAtomInstance(data.element.renderType)
      ? data.element.renderType.current.type
      : null

    expect(output).toMatchObject({
      atomType,
      element: data.element,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.element.id,
      }),
    })
  })
})
