import { TypeKind } from '@codelab/shared/abstract/core'
import { render, waitFor } from '@testing-library/react'
import { RenderProps } from '../../store'
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
