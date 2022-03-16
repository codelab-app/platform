import '@testing-library/jest-dom/extend-expect'
import { PropsData } from '@codelab/shared/abstract/core'
import { render } from '@testing-library/react'
import React from 'react'
import {
  componentRootElement,
  RenderContext,
  renderPipeline,
  treeToRender,
} from '../pipes'
import { transformPropsToComponentFn } from './transformPropsToComponentFn'

const propsToRender: PropsData = {
  renderText: { id: componentRootElement.id },
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

    console.log({ renderText })

    const RenderFn = renderText as React.ComponentType<any>
    const { findByText } = render(React.createElement(RenderFn, {}))

    expect(await findByText(initialProps.text)).toBeInTheDocument()
  })
})
