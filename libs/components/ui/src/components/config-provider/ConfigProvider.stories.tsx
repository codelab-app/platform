import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { configProviderData } from './ConfigProvider.data'

export default {
  title: 'ConfigProvider',
}

export const ComponentSize = () => {
  const ConfigProvider = TreeDom.render(configProviderData)

  return <ConfigProvider />
}
