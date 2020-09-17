import React from 'react'
import { TreeDom } from '../renderer/TreeDom'
import {
  renderPropsData,
  BasicPropsPassedInDeepData,
} from './Props-renderProps.data'
import { divData } from '../components/html/Html.data'

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

export const BasicPropsPassedInDeep = () => {
  const Component = TreeDom.render(BasicPropsPassedInDeepData)

  return <Component />
}
