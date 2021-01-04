import React from 'react'
import { pageHeaderData } from './PageHeader.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'PageHeader',
  parameters: {
    data: {
      Default: pageHeaderData,
    },
  },
}

export const Default = () => {
  const PageHeader = Renderer.components(pageHeaderData)

  return <PageHeader />
}
