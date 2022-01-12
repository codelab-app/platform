import { PropsData } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import React from 'react'
import {
  componentToRender,
  RenderContext,
  renderPipeline,
  treeToRender,
} from '../pipes'
import { transformPropsToComponentFn } from './transformPropsToComponentFn'

const propsToRender: PropsData = {
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
    const { findByText } = render(<RenderFn />)

    expect(await findByText(initialProps.text)).toBeInTheDocument()
  })
})
