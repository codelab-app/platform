import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { renderAtomPipe } from './renderAtomPipe'
import { renderPipeline } from './renderPipeline'
import { elementToRender03, endPipe, treeToRender } from './test'
import { RenderContext } from './types'

const defaultContext = {
  tree: treeToRender,
  render: renderPipeline,
} as RenderContext

const initialProps: PropData = {
  text: 'a text to render',
}

describe('RenderAtomPipe', () => {
  it('should render element atom ', async () => {
    const output = renderAtomPipe(endPipe)(
      elementToRender03,
      defaultContext,
      initialProps,
    ) as ReactElement

    const { findByText } = render(output)

    expect(await findByText(initialProps.text)).toBeInTheDocument()
  })
})
