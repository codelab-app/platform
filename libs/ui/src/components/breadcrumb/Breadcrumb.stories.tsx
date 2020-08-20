import React from 'react'
import { breadcrumbData } from './Breadcrumb.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Breadcrumb',
}

export const Default = () => {
  const Breadcrumb = TreeDom.render(breadcrumbData)

  return <Breadcrumb />
}
