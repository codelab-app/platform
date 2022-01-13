import { PropsData, TypeKind } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import React from 'react'
import { reactNodePipe } from './reactNodePipe'
import { renderPipeline } from './renderPipeline'
import {
  componentToRender,
  elementToRender,
  endPipe,
  EndPipeOutput,
  treeToRender,
} from './test'
import { RenderContext } from './types'

const defaultContext = {
  tree: treeToRender,
  render: renderPipeline,
  reactRender: React.createElement,
} as RenderContext

const initialProps: PropsData = {
  renderText: {
    typeKind: TypeKind.ReactNodeType,
    id: componentToRender.id,
  },
  text: 'a random text to render',
}

describe('ReactNodePipe', () => {
  it('should render props when typeKind is ReactNodeType', async () => {
    const { props } = reactNodePipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    const { renderText } = props
    const { findByText } = render(renderText)

    expect(await findByText(initialProps.text)).toBeInTheDocument()
  })
})
