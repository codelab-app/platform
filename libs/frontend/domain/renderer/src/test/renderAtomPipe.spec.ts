import { atomRef } from '@codelab/frontend/domain/atom'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/domain/element'
import { render } from '@testing-library/react'
import { AtomRenderPipe } from '../renderPipes/atomRenderPipe'
import { setupTestForRenderer } from './setup/setupTest'

describe('RenderAtomPipe', () => {
  const data = setupTestForRenderer([AtomRenderPipe])

  it('should render element atom', async () => {
    const text = 'a text to render'
    data.elementToRender.setAtom(atomRef(data.textAtom.id))
    data.elementToRender.props?.set(CUSTOM_TEXT_PROP_KEY, text)

    const output = data.renderer.renderElement(data.elementToRender)
    const { findByText } = render(output)

    expect(await findByText(text)).toBeInTheDocument()
  })
})
