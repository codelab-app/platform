import React from 'react'
import { breadcrumbData } from './Breadcrumb.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Breadcrumb',
}

export const Default = () => {
  const Breadcrumb = Renderer.components(breadcrumbData)

  return <Breadcrumb />
}
