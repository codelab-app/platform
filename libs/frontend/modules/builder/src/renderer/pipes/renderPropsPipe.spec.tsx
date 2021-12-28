import { TypeKind } from '@codelab/shared/abstract/core'
import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { RenderProps } from '../../store'
import { renderPipeline } from './renderPipeline'
import { renderPropsPipe } from './renderPropsPipe'
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
    typeKind: TypeKind.RenderPropsType,
    id: componentToRender.id,
  },
  text: 'a random text to render',
}

describe('RenderPropsPipe', () => {
  it('should transform props to a react component function when typeKind is RenderPropsType ', async () => {
    const { props } = renderPropsPipe(endPipe)(
      elementToRender,
      defaultContext,
      initialProps,
    ) as EndPipeOutput

    const { renderText: RenderFn } = props
    const renderer = render(<RenderFn />)

    await waitFor(() =>
      expect(renderer.getByText(initialProps.text)).toBeInTheDocument(),
    )
  })
})
