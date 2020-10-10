import React from 'react'
import { pageHeaderData } from './PageHeader.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'PageHeader',
}

export const Default = () => {
  const PageHeader = Renderer.components(pageHeaderData)

  return <PageHeader />
}
