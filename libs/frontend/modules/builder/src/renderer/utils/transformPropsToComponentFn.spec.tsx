import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { RenderProps } from '../../store'
import {
  componentToRender,
  RenderContext,
  renderPipeline,
  treeToRender,
} from '../pipes'
import { transformPropsToComponentFn } from './transformPropsToComponentFn'

const propsToRender: RenderProps = {
  renderText: { id: componentToRender.id },
}

const defaultContext = {
  tree: treeToRender,
  render: renderPipeline,
} as RenderContext

const initialProps = { text: 'text to render' }

describe('TransformPropsToComponentFn', () => {
  it('should transform props to component functions', async () => {
    const { renderText } = transformPropsToComponentFn(
      propsToRender,
      defaultContext,
      initialProps,
    )

    const RenderFn = renderText as React.ComponentType<any>
    const rendered = render(<RenderFn />)

    await waitFor(() => {
      expect(rendered.getByText(initialProps.text)).toBeInTheDocument()
    })
  })
})
