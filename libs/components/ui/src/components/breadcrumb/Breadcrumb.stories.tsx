import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { breadcrumbData } from './Breadcrumb.data'

export default {
  title: 'Breadcrumb',
}

export const Default = () => {
  const Breadcrumb = TreeDom.render(breadcrumbData)

  return <Breadcrumb />
}
