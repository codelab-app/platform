import React from 'react'
import { breadcrumbData } from './Breadcrumb.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Breadcrumb',
  parameters: {
    data: {
      Default: breadcrumbData,
    },
  },
}

export const Default = () => {
  const Breadcrumb = Renderer.components(breadcrumbData)

  return <Breadcrumb />
}
