import React from 'react'
import { tabsData } from './Tabs.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Tabs',
}

export const Default = () => {
  const Tabs = TreeDom.render(tabsData)

  return <Tabs />
}
