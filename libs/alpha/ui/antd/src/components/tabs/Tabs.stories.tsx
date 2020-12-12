import React from 'react'
import { tabsData } from './Tabs.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Tabs',
  parameters: {
    data: {
      Default: tabsData,
    },
  },
}

export const Default = () => {
  const Tabs = Renderer.components(tabsData)

  return <Tabs />
}
