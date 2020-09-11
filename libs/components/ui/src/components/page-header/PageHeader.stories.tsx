import React from 'react'
import { pageHeaderData } from './PageHeader.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'PageHeader',
}

export const Default = () => {
  const PageHeader = TreeDom.render(pageHeaderData)

  return <PageHeader />
}
