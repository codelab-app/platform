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
    data.atomInstance.setRenderIfExpression('{{this.shouldRender}}')
  })

  it('should render normally if no expression is set', async () => {
    const output = data.renderer.renderIntermediateElement(
      data.atomInstance,
      {},
    )

    const atomType = isAtomInstance(data.atomInstance.renderType)
      ? data.atomInstance.renderType.current.type
      : null

    expect(output).toMatchObject({
      atomType,
      element: data.atomInstance,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.atomInstance.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    data.atomInstance.store.current.setInitialState({ shouldRender: false })

    const output = data.renderer.renderIntermediateElement(
      data.atomInstance,
      {},
    )

    expect(output).toMatchObject({ element: data.atomInstance })
  })

  it('should continue rendering', async () => {
    data.atomInstance.store.current.setInitialState({ shouldRender: true })

    const initialProps = {
      prop01: 'prop01',
    }

    const output = data.renderer.renderIntermediateElement(
      data.atomInstance,
      initialProps,
    )

    const atomType = isAtomInstance(data.atomInstance.renderType)
      ? data.atomInstance.renderType.current.type
      : null

    expect(output).toMatchObject({
      atomType,
      element: data.atomInstance,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: data.atomInstance.id,
      }),
    })
  })
})
