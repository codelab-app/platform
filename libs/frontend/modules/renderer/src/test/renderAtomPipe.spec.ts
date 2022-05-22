import { atomRef } from '@codelab/frontend/modules/atom'
import { render } from '@testing-library/react'
import { AtomRenderPipe } from '../renderPipes/atomRenderPipe'
import { setupTestForRenderer } from './setup/setupTest'

describe('RenderAtomPipe', () => {
  const data = setupTestForRenderer([AtomRenderPipe])

  it('should render element atom', async () => {
    const text = 'a text to render'
    data.elementToRender.setAtom(atomRef(data.textAtom.id))
    data.elementToRender.props?.set('text', text)

    const output = data.renderer.renderElement(data.elementToRender)
    const { findByText } = render(output)

    expect(await findByText(text)).toBeInTheDocument()
  })
})
