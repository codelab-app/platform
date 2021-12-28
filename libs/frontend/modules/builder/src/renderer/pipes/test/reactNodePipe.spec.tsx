import { TypeKind } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { render, waitFor } from '@testing-library/react'
import { RenderProps } from '../../../store'
import { reactNodePipe } from '../reactNodePipe'
import { renderPipeline } from '../renderPipeline'
import { RenderContext } from '../types'
import { componentToRender, elementGraph, elementToRender } from './renderData'
import { EndPipeOutput } from './types'
import { endPipe } from './utils'

const tree = new ElementTree(elementGraph)

const defaultContext = {
  tree,
  render: renderPipeline,
} as RenderContext

const initialProps: RenderProps = {
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
    const renderer = render(renderText)

    await waitFor(() =>
      expect(renderer.getByText(initialProps.text)).toBeInTheDocument(),
    )
  })
})
