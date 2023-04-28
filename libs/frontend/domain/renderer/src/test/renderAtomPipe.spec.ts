import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/core'
import { render } from '@testing-library/react'
import { AtomRenderPipe } from '../renderPipes/atomRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('RenderAtomPipe', () => {
  const { pageRootElement, renderer } = setupTestForRenderer([AtomRenderPipe])

  it('should render element atom', async () => {
    const elementProps = pageRootElement.props.current
    const text = 'a text to render'

    elementProps.set(CUSTOM_TEXT_PROP_KEY, text)

    const output = renderer.renderElement(pageRootElement)
    const { findByText } = render(output)

    expect(await findByText(text)).toBeInTheDocument()
  })
})
