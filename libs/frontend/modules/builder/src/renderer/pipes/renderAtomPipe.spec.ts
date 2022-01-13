import { PropsData } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { renderAtomPipe } from './renderAtomPipe'
import { renderPipeline } from './renderPipeline'
import { elementToRender03, endPipe, treeToRender } from './test'
import { RenderContext } from './types'

const defaultContext = {
  tree: treeToRender,
  render: renderPipeline,
  reactRender: React.createElement,
} as RenderContext

const initialProps: PropsData = {
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
