import React from 'react'
import { divData } from '../components/html/Html.data'
import { renderPropsData } from './Props-renderProps.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Props',
}

export const Default = () => {
  const Component = TreeDom.render(renderPropsData)

  return <Component />
}

export const Children = () => {
  const Div = TreeDom.render(divData)

  return <Div>Content</Div>
}
