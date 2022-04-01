import { atomRef } from '@codelab/frontend/modules/atom'
import { render } from '@testing-library/react'
import { AtomRenderPipe } from '../renderPipes/AtomRenderPipe'
import { setupTestRenderData } from './testData/renderData'

describe('RenderAtomPipe', () => {
  const data = setupTestRenderData((next) => new AtomRenderPipe({ next }))

  it('should render element atom ', async () => {
    const text = 'a text to render'
    data.elementToRender.setAtom(atomRef(data.textAtom))
    data.elementToRender.props?.set('text', text)

    const output = data.renderService.renderElement(data.elementToRender)
    const { findByText } = render(output)

    expect(await findByText(text)).toBeInTheDocument()
  })
})
