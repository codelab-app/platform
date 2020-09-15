import React from 'react'
import { breadcrumbData } from './Breadcrumb.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Breadcrumb',
}

export const Default = () => {
  const Breadcrumb = TreeDom.render(breadcrumbData)

  return <Breadcrumb />
}
