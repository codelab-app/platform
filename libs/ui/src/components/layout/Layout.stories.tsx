import React from 'react'
import { layoutData } from './Layout.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Layout',
}

export const Default = () => {
  const Layout = TreeDom.render(layoutData)

  return <Layout />
}
