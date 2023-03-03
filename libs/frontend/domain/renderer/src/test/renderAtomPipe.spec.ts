import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/core'
import { render } from '@testing-library/react'
import { AtomRenderPipe } from '../renderPipes/atomRenderPipe'
import { setupTestForRenderer } from './setup/setup-test'

describe('RenderAtomPipe', () => {
  const data = setupTestForRenderer([AtomRenderPipe])

  it('should render element atom', async () => {
    const text = 'a text to render'
    data.elementToRender.setRenderType(atomRef(data.textAtom.id))
    data.elementToRender.props.current.set(CUSTOM_TEXT_PROP_KEY, text)

    const output = data.rootStore.renderer.renderElement(data.elementToRender)
    const { findByText } = render(output)

    expect(await findByText(text)).toBeInTheDocument()
  })
})
