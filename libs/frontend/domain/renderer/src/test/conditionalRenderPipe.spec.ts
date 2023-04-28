import { DATA_ELEMENT_ID } from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { ConditionalRenderPipe } from '../renderPipes/conditionalRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('ConditionalRenderPipe', () => {
  const { pageRootElement: element, renderer } = setupTestForRenderer([
    ConditionalRenderPipe,
  ])

  beforeEach(() => {
    element.setRenderIfExpression('{{this.shouldRender}}')
  })

  it('should render normally if no expression is set', async () => {
    element.setRenderIfExpression(undefined)

    const output = renderer.renderIntermediateElement(element, {})

    const atomType = isAtomInstance(element.renderType)
      ? element.renderType.current.type
      : null

    expect(output).toEqual({
      atomType,
      element: element,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: element.id,
      }),
    })
  })

  it('should stop rendering by returning an empty output', async () => {
    element.store.current.setInitialState({ shouldRender: false })

    const output = renderer.renderIntermediateElement(element, {})

    expect(output).toMatchObject({
      element: element,
    })
  })

  it('should continue rendering', async () => {
    element.store.current.setInitialState({ shouldRender: false })

    const initialProps = {
      prop01: 'prop01',
    }

    const output = renderer.renderIntermediateElement(element, initialProps)

    const atomType = isAtomInstance(element.renderType)
      ? element.renderType.current.type
      : null

    expect(output).toEqual({
      atomType,
      element: element,
      props: expect.objectContaining({
        [DATA_ELEMENT_ID]: element.id,
      }),
    })
  })
})
