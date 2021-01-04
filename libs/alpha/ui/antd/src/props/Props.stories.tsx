import React from 'react'
import { divData } from '../components/html/Html.data'
import { renderPropsData } from './Props-renderProps.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Props',
}

export const Default = () => {
  const Component = Renderer.components(renderPropsData)

  return <Component />
}

export const Children = () => {
  const Div = Renderer.components(divData)

  return <Div>Content</Div>
}
