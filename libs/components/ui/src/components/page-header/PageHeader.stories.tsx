import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { pageHeaderData } from './PageHeader.data'

export default {
  title: 'PageHeader',
}

export const Default = () => {
  const PageHeader = TreeDom.render(pageHeaderData)

  return <PageHeader />
}
