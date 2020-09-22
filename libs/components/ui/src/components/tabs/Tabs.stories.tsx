import React from 'react'
import { tabsData } from './Tabs.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Tabs',
}

export const Default = () => {
  const Tabs = Renderer.components(tabsData)

  return <Tabs />
}
