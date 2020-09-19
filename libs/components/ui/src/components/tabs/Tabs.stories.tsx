import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { tabsData } from './Tabs.data'

export default {
  title: 'Tabs',
}

export const Default = () => {
  const Tabs = TreeDom.render(tabsData)

  return <Tabs />
}
